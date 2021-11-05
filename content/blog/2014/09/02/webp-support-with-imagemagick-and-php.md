---
title: "WebP Support with ImageMagick and PHP"
excerpt: "This was something I've been meaning to try and figure out one way or the other. WebP has some huge wins for reducing images sizes, so here's my first attempt at getting something up and running."
mainImage: "/images/blog/2014/07/25/5849354012-74dfc121e9-o.jpg"
primaryColor: "#783229"
date: "2014-09-02T18:39:00-07:00"
updatedOn: "2014-09-02T18:39:00-07:00"
slug: "webp-support-with-imagemagick-and-php"
---

# WebP Support with ImageMagick and PHP

I've been wanting to get WebP set-up on my site for a little while now, the biggest barrier to entry has been getting it integrated into the flow already had, where I generate different sized images where I need to.

It turns out you can use ImageMagick *if* it can find  *libwebp-dev* when it's built.

By default, unfortunately, Ubuntu doesn't come with ImageMagick built with WebP support and I'm assuming the same is true for Debian (I got everything working on Ubuntu and went through the same process on Debian - didn't check Debian needed this, I just assumed).

Anyway, I stumbled on this post which outlines how you can build webp support into ImageMagick.

[http://askubuntu.com/questions/251950/imagemagick-convert-cant-convert-to-webp](http://askubuntu.com/questions/251950/imagemagick-convert-cant-convert-to-webp)

# Check Your Version

After landing WebP I ended up hitting a problem later on where the alpha channel was messed up somewhere in the WebP conversion and displayed a black background - Booooo.

Turns out this is [a bug in ImageMagick](http://www.imagemagick.org/discourse-server/viewtopic.php?f=3&t=22793&p=95304&hilit=webp+alpha+webp#p95304).

The way to get around the problem is to install a version higher than or equal to 6.8.3-0 Beta. This may be an option for you using the information on [this ImageMagick post](http://www.imagemagick.org/discourse-server/viewtopic.php?f=1&t=24284#p105786). The problem here, is that to compile newer versions of ImageMagick you need to have version 0.3.0 or higher of libwebp. Debian (and possibly) Ubuntu ships with 0.1.3. You can check yours with:

```bash
sudo aptitude versions libwebp-dev
```

What to do? Well I bailed at this point. The code is sat on my server, but disabled by a boolean. When I get a newer version of ImageMagick or libwebp I will update everything and see if enabling it works or not.

# Adding WebP Support to ImageMagick

To support WebP conversion in ImageMagick I had to install *libwebp-dev* with:

```bash
sudo apt-get install libwebp-dev
```

Then it was a case of rebuilding ImageMagick.

```bash
cd /tmp
mkdir imagemagick
cd imagemagick
sudo apt-get build-dep imagemagick
sudo apt-get install libwebp-dev devscripts
sudo apt-get install graphicsmagick-imagemagick-compat
apt-get source imagemagick
cd imagemagick-*
debuild -uc -us
sudo dpkg -i ../*magick*.deb
```

This all seemed to work, although I did get some weird/scary looking error messages after the final command.

```bash
Errors were encountered while processing:
    ../imagemagick_6.7.7.10-5+deb7u3_amd64.deb
    imagemagick-dbg
    libmagickcore-dev
    libmagickwand-dev
    libmagick++-dev
```

What I ended up doing to get around this was run the following:

```bash
sudo apt-get -f install
sudo dpkg -i ../imagemagick_6.7.7.10-5+deb7u3_amd64.deb
```

# Web Page Test

I ran everything through [WebPageTest.org](http://webpagetest.org) and WebP has a positive impact on my site (surprise, surprise).

On the home page the image went from 141.5 KB to 66.8 KB and that results in a load time from 959 ms to 393 ms.

You can see the difference in the results below.

[WebPageTest Results Before WebP](http://www.webpagetest.org/result/140725_0J_YC8/)

[WebPageTest Results After WebP](http://www.webpagetest.org/result/140725_JH_YQA/)

# How Do You Convert to WebP?

One thing I do on my site is format the file names in the URL in such a way that it includes the desired image dimensions as well as the density of the screen.

This means I can decide what size image I send to the browser.

For that reason, I got ImageMagick to do a couple of extra things, other than just convert, it strips the images metadata, crops it and then resizes it.

```php
function resizeAndConvertImageWebP(
    $width,
    $height,
    $density,
    $originalFilepath,
    $resizedFilepath) {
  $newWidth = $width * $density;
  $newHeight = $height * $density;

  $image = new Imagick($originalFilepath);
  $origImageDimens = $image->getImageGeometry();
  $origImgWidth = $origImageDimens['width'];
  $origImgHeight = $origImageDimens['height'];

  if($newWidth == 0) {
    $ratioOfHeight = $newHeight / $origImgHeight;
    $newWidth = $origImgWidth * $ratioOfHeight;
  }

  if($newHeight == 0) {
    $ratioOfWidth = $newWidth / $origImgWidth;
    $newHeight = $origImgHeight * $ratioOfWidth;
  }

  $widthRatios = $origImgWidth / $newWidth;
  $heightRatios = $origImgHeight / $newHeight;

  if($widthRatios <= $heightRatios) {
    $cropWidth = $origImgWidth;
    $cropHeight = $newWidth * $widthRatios;
  } else {
    $cropWidth = $newHeight * $heightRatios;
    $cropHeight = $origImgHeight;
  }

  $cropX = ($origImgWidth - $cropWidth) / 2;
  $cropY = ($origImgHeight - $cropHeight) / 2;

  $image->stripImage();
  $image->cropImage($cropWidth, $cropHeight, $cropX, $cropY);
  $image->resizeImage($newWidth, $newHeight, imagick::FILTER_LANCZOS, 0.9);
  $image->setImageFormat('webp');
  $image->setImageAlphaChannel(imagick::ALPHACHANNEL_ACTIVATE);
  $image->setBackgroundColor(new ImagickPixel('transparent'));
  $image->writeImage($resizedFilepath);
}
```

The important lines of code for WebP conversion are:

```php
$image->setImageFormat('webp');
$image->setImageAlphaChannel(imagick::ALPHACHANNEL_ACTIVATE);
$image->setBackgroundColor(new ImagickPixel('transparent'));
```

This defines the final image format to WebP and then ensures that if you are converting a PNG, it keeps any alpha channels.

# Apache GD Method for WebP Conversion

The Apache GD library can actually handle WebP as well  and this was going to be my original approach, however some issues in the library caused it to incorrectly pad the file so it fails to render.

More info here: [https://bugs.php.net/bug.php?id=66590](https://bugs.php.net/bug.php?id=66590)

If that wasn't an issue, the basic code would look something like:

```php
$im = $this->imageCreateFromAny($originalFilepath);
if(!$im) {
    // Unrecognized format
    return false;
}

imagewebp($im, $resizedFilepath);
imagedestroy($im);
```

Where imageCreateFromAny is a method I found from [this PHP Doc](http://php.net/manual/en/function.imagecreatefromjpeg.php).

```php
function imageCreateFromAny($filepath) {
  $type = exif_imagetype($filepath); // [] if you don't have exif you could use getImageSize()
  $allowedTypes = array(
    1,  // [] gif
    2,  // [] jpg
    3,  // [] png
    6   // [] bmp
  );
  if (!in_array($type, $allowedTypes)) {
    return false;
  }
  switch ($type) {
    case 1 :
      $im = imageCreateFromGif($filepath);
      break;
    case 2 :
      $im = imageCreateFromJpeg($filepath);
      break;
    case 3 :
      $im = imageCreateFromPng($filepath);
      break;
    case 6 :
      $im = imageCreateFromBmp($filepath);
      break;
  }
  return $im;
}
```

# Detecting WebP Support or Not

Browsers which support WebP will include an accept header for 'image/webp' which I just look for and take that as a go ahead to serve up WebP.

```php
// Do we support WebP?
$webpsupport = (strpos($_SERVER['HTTP_ACCEPT'], 'image/webp') >= 0);
if($webpsupport) {
  $this->attemptToServeWebP($pathinfo, $matches, $width, $height, $density);
} else {
  $this->attemptToServeNormal($pathinfo, $matches, $width, $height, $density);
}
```

# Useful Tid-Bit

If you need to delete all of your auto generated WebP files for some reason, this will delete all of them from your current directory (including sub-directories).

```bash
sudo find . -type f -iname \*.webp -delete
```

# Conclusion

WebP is pretty cool for shaving off some extra page weight and it's not too bad to support if you have some kind of image generation in place already.

If not, then it may be worth looking for a Grunt or Gulp task to do it.

Grunt has [grunt-webp](https://github.com/somerandomdude/grunt-webp)

Gulp has [gulp-webp](https://github.com/sindresorhus/gulp-webp)

Orig Photo: [https://flic.kr/p/9UTtaf](https://flic.kr/p/9UTtaf)