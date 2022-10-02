---
title: "GLIBC not found with AWS SAM and Golang"
description: "How to fix the GLIBC_2.32 not found error when working with AWS Lambda and/or SAM with Golang."
mainImage: "/images/blog/2022/2022-10-01/tim-gouw-1K9T5YiZ2WU-unsplash.jpg"
mainImageAlt: A stressed person looking at their laptop.
date: "2022-10-01T11:44:00-07:00"
updatedOn: "2022-10-01T11:44:00-07:00"
---

# GLIBC not found with AWS SAM and Golang

A small AWS SAM project stopped working due to my OS updating to a newer dependency version that SAM couldn't use.

The error I'd run into occurred when running the Lambda function:

```text
/var/task/healthcheck: /lib64/libc.so.6: version `GLIBC_2.32' not found (required by /var/task/healthcheck)
/var/task/healthcheck: /lib64/libc.so.6: version `GLIBC_2.34' not found (required by /var/task/healthcheck)
2022/10/01 18:48:58 exit status 1
01 Oct 2022 18:48:58,162 [ERROR] (rapid) Init failed error=Runtime exited with error: exit status 1 InvokeID=
/var/task/healthcheck: /lib64/libc.so.6: version `GLIBC_2.32' not found (required by /var/task/healthcheck)
/var/task/healthcheck: /lib64/libc.so.6: version `GLIBC_2.34' not found (required by /var/task/healthcheck)
2022/10/01 18:48:58 exit status 1
```

This error has been reported to [aws-lambda-go here](https://github.com/aws/aws-lambda-go/issues/340),
however, the fix is to build the project using `go build`, and I've been using
`sam build.`

I did try using `sam build --use-containers`, which I assume would have all
the dependencies needed by AWS, but that
[doesn't work for Golang projects](https://github.com/aws/aws-lambda-go/issues/340).

Since `go build` can build binaries that will work with AWS Lambda, it makes sense to try and use that instead of the build created by `sam build`.

[@shearn89 describes how this can be done by configuring a `BuildMethod`](https://github.com/aws/aws-sam-cli/issues/3894#issuecomment-1132713583).

By setting the [BuildMethod](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/building-layers.html#building-applications-examples-makefile)
to `makefile`, the sam CLI will copy the functions files into a temp directory,
run a make target and expect a binary to be built into the `$ARTIFACTS_DIR`
directory.

## The Solution


For context, my project is structured like so:

```text
.
├── go.mod
├── go.sum
├── Makefile
├── samconfig.toml
├── template.yaml
├── lambda
│   ├── healthcheck
│   │   ├── healthcheck.go ✨
│   │   └── healthcheck_test.go
│   └── <function group>
│       └── <function group>
│           ├── <function>.go ✨
│           └── <function>_test.go
└── utils
    └── jsonresponse
        ├── jsonresponse.go
        └── jsonresponse_test.go
```

The `lambda/` directory contains the functions that will run on AWS Lambda. The
`go.mod` file is at the root of the project allowing my Lambda functions to
reference local packages like `utils/jsonresponse/jsonresponse.go`.

### Add 'BuildMethod: makefile' to your template

Change your template file to use a makefile instead of sam's build method.

Initially my template looked like this:

```yaml
HealthCheckFunction:
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: lambda/healthcheck/
      Handler: healthcheck
      FunctionName: !Sub "healthcheck_${Env}"
      Runtime: go1.x
      Architectures:
        - x86_64
      Events:
        ...
```

To build with a Makefile, we need to add a `Metadata > BuildMethod` attribute
to the function definition and I had to change the `CodeUri` path so that
`sam build` will copy the whole code base into its temp directory and
`go build` can use the root directories go.mod file.

With these changes, the function definition becomes:

```yaml
HealthCheckFunction:
    Type: AWS::Serverless::Function
    Metadata:
      BuildMethod: makefile
    Properties:
      CodeUri: .
      Handler: healthcheck
      FunctionName: !Sub "healthcheck_${Env}"
      Runtime: go1.x
      Architectures:
        - x86_64
      Events:
        ...
```

### Add a Makefile

You'll need to create a `Makefile` in the same directory as the `CodeUri`
for each of your functions.

I already had a Makefile, so I started by adding the following target:

```makefile
build-HealthCheckFunction:
  GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o healthcheck lambda/healthcheck/healthcheck.go
  mv healthcheck $(ARTIFACTS_DIR)
```

The target has the name `build-<Template Function Name>` and the binaries
are placed in the `$ARTIFACTS_DIR` so sam can access them.

#### Cleanup make file

Once I got this working, I moved the Lambda function methods into a separate
file `lambda.mk`, which I pull into my make file:

```makefile
include lambda.mk
```

Then I re-jigged the `build-*` targets like so:

```makefile
build-lambda-function:
  ls -l
  GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o $(HANDLER) lambda/$(DIR)/$(HANDLER).go
  mv $(HANDLER) $(ARTIFACTS_DIR)/

build-HealthCheckFunction: HANDLER=healthcheck
build-HealthCheckFunction: DIR=healthcheck
build-HealthCheckFunction: build-lambda-function

build-.....
```

With these changes, I can run `sam build` or `sam local start-api` as normal
and no more errors.
