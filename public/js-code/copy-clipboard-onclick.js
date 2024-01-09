

const copyImgURLAsImageToClipboard = async function (imgURL) {
  // based on https://web.dev/articles/async-clipboard
  console.log("copyImgURLAsImageToClipboard", imgURL);
  try {
    // console.log("imgURL", imgURL);
    const data = await fetch(imgURL);
    const blob = await data.blob();
    console.log(data);
    console.log(blob);
    console.log(navigator.clipboard.write);
    await navigator.clipboard.write([
      new ClipboardItem({
        // The key is determined dynamically based on the blob's type.
        [blob.type]: blob,
      }),
    ]);
    console.log("Image copied.");
  } catch (err) {
    console.error(err.name, err.message);
  }
};

const onclickCopyImageToClipboard = async function (event) {
  // based on https://web.dev/articles/async-clipboard
  try {
    console.log("event", event);
    if (event.ctrlKey) {
      copyImgURLAsImageToClipboard(event.target.href);
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
}

function copyClipboardOnclick() {
  for (const el of document.querySelectorAll(".downloadButtons .linkButton")) {
    el.addEventListener("click", onclickCopyImageToClipboard);
  }
}

copyClipboardOnclick();
