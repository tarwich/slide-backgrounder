# Slide Backgrounder

Use this program to generate slide backgrounds from existing images

You must have ImageMagick installed in order to use this program. Technically you could use ImageMagick directly, but this script makes it easier to do without neeing to know quite so many quirks of ImageMagick.

## Usage

```
npm install
node . --help
```

All the options are *optional*, so only supply the arguments that you need. If you have an issue, please open an issue. I don't mind.

### Options

**blur** Blurs the image. I might change the value for this later, but currently it's just passed through to ImageMagick as `0x<blur>`. A sensible number should be a number between 8 and 32.

**fade** Fade the image. This overlays the image with a `<fade>` opacity black rectangle.

**crop** Crop the image (after resizing it). This is `<width>x<height>+<left>+<top>` and works best with `--center`.

**center** Makes crop operations act upon the center of the image.

**resize** Resize the image before cropping. This will resize the fill the image area in order to prevent the ugly "pillars" that result from an underfilled image.