---
title: "CodeIgniter + Markdown + Libraries = Hell"
excerpt: "Ever tried getting a third party library working in CodeIgniter? No? Oh, well maybe it's best to keep it that way aye."
mainImage: "/images/blog/2014/05/24/hell.jpg"
primaryColor: "#b95625"
date: "2014-03-17T20:35:54-07:00"
updatedOn: "2014-03-17T20:35:54-07:00"
slug: "codeigniter-markdown-libraries-hell"
---

# CodeIgniter + Markdown + Libraries = Hell

When it comes to pulling in third party libraries in CodeIgniter, there seems to be this little dance you need to do to get things working - frankly it sucks.

One of the tasks I had on my to-do list was to get Markdown converting to HTML using this helpful set of PHP classes: <http://michelf.ca/projects/php-markdown/>

Put the markdown files from Michel Fortin into the *third_party* directory, in my case I created a directory called *Md* and moved the PHP files into the root of that directory (*third_party/Md/*).

Create a file called *md.php* in the *libraries* directory and in the *md.php* file put:

```php
<?php
if (!defined('BASEPATH'))
  exit('No direct script access allowed');

set_include_path(APPPATH . 'third_party/' . PATH_SEPARATOR . get_include_path());

require_once APPPATH . 'third_party/Md/MarkdownInterface.php';
require_once APPPATH . 'third_party/Md/Markdown.php';

class Md extends Michelf\Markdown {
  function __construct($params = array()) {
    parent::__construct();
  }
}
```

Then to import and use it:

```php
$this->load->library('md');
$html = $this->md->defaultTransform($markdown);
```

Orig. Photo: <https://flic.kr/p/89e5oR>