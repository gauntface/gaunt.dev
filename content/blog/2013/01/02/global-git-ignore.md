---
title: "Global Git Ignore"
excerpt: |
  Having unwanted files in a git repo is just a pain and can often bloat your repo, often resulting in problems when working with others.

  Here's a brain dump of using the global git ignore and the files I ignore by default.
mainImage: "/images/blog/2014/06/15/4817906071-ebe598d664-o.jpg"
primaryColor: "#453338"
date: "2013-01-02T14:02:54-08:00"
updatedOn: "2013-01-02T14:02:54-08:00"
slug: "global-git-ignore"
---

# Global Git Ignore

Here's a nifty trick [Les Vogel](https://plus.google.com/107226127526541403399/posts) introduced me to, to set a global git ignore file.

```bash
git config --global core.excludesfile ~/.gitignore_global
nano ~/.gitignore_global
```

Then for me I add in the following:

```
.project
.settings
.idea
# built application files
*.apk
*.ap_

# files for the dex VM
*.dex

# Java class files
*.class

# IntelliJ config files
*.iml

# generated files
bin/
gen/

# Local configuration file (sdk path, etc)
local.properties
#########################
# .gitignore file for Xcode4 / OS X Source projects
#
# Version 2.0
# For latest version, see: http://stackoverflow.com/questions/49478/git-ignore-file-for-xcode-projects
#
# 2013 updates:
# - fixed the broken "save personal Schemes"
#
# NB: if you are storing "built" products, this WILL NOT WORK,
# and you should use a different .gitignore (or none at all)
# This file is for SOURCE projects, where there are many extra
# files that we want to exclude
#
#########################

#####
# OS X temporary files that should never be committed

.DS_Store
*.swp
*.lock
profile


####
# Xcode temporary files that should never be committed
#
# NB: NIB/XIB files still exist even on Storyboard projects, so we want this...

*~.nib


####
# Xcode build files -
#
# NB: slash on the end, so we only remove the FOLDER, not any files that were badly named "DerivedData"

DerivedData/

# NB: slash on the end, so we only remove the FOLDER, not any files that were badly named "build"

build/


#####
# Xcode private settings (window sizes, bookmarks, breakpoints, custom executables, smart groups)
#
# This is complicated:
#
# SOMETIMES you need to put this file in version control.
# Apple designed it poorly - if you use "custom executables", they are
#  saved in this file.
# 99% of projects do NOT use those, so they do NOT want to version control this file.
#  ..but if you're in the 1%, comment out the line "*.pbxuser"

*.pbxuser
*.mode1v3
*.mode2v3
*.perspectivev3
#    NB: also, whitelist the default ones, some projects need to use these
!default.pbxuser
!default.mode1v3
!default.mode2v3
!default.perspectivev3


####
# Xcode 4 - semi-personal settings
#
#
# OPTION 1: ---------------------------------
#     throw away ALL personal settings (including custom schemes!
#     - unless they are "shared")
#
# NB: this is exclusive with OPTION 2 below
xcuserdata

# OPTION 2: ---------------------------------
#     get rid of ALL personal settings, but KEEP SOME OF THEM
#     - NB: you must manually uncomment the bits you want to keep
#
# NB: this is exclusive with OPTION 1 above
#
#xcuserdata/**/*

#     (requires option 2 above): Personal Schemes
#
#!xcuserdata/**/xcschemes/*

####
# XCode 4 workspaces - more detailed
#
# Workspaces are important! They are a core feature of Xcode - don't exclude them :)
#
# Workspace layout is quite spammy. For reference:
#
# /(root)/
#   /(project-name).xcodeproj/
#     project.pbxproj
#     /project.xcworkspace/
#       contents.xcworkspacedata
#       /xcuserdata/
#         /(your name)/xcuserdatad/
#           UserInterfaceState.xcuserstate
#     /xcsshareddata/
#       /xcschemes/
#         (shared scheme name).xcscheme
#     /xcuserdata/
#       /(your name)/xcuserdatad/
#         (private scheme).xcscheme
#         xcschememanagement.plist
#
#

####
# Xcode 4 - Deprecated classes
#
# Allegedly, if you manually "deprecate" your classes, they get moved here.
#
# We're using source-control, so this is a "feature" that we do not want!

*.moved-aside

####
# Cocoapods: cocoapods.org
#
# Ignoring these files means that whoever uses the code will first have to run:
# pod install
# in the App.xcodeproj directory.
# This ensures the latest dependencies are used.
Pods/
Podfile.lock

####
# UNKNOWN: recommended by others, but I can't discover what these files are
#
# ...none. Everything is now explained.
```

The only down side I can see to this is if you are working on a team, this is no longer synced up with a projects repo (i.e. having a *.gitignore* file in the project directory), which isn't a problem if you know everyone you are working with, but for open source projects it relies on others sticking to a similar approach.

I wonder if it's easier in the long run to have a local *.gitignore* file and avoid unwanted files being committed from contributors who don't have the same set up.

Orig. Photo: [https://flic.kr/p/8kK2C4](https://flic.kr/p/8kK2C4)