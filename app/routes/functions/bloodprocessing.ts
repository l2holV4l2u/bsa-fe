export async function bloodProcessing(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch("http://127.0.0.1:5000/api/edgedetection/", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  let contourFile = null;
  if (data.contour_image) {
    const byteCharacters = atob(data.contour_image);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset++) {
      const byteArray = byteCharacters.charCodeAt(offset);
      byteArrays.push(byteArray);
    }

    const byteArray = new Uint8Array(byteArrays);
    const blob = new Blob([byteArray], { type: "image/png" });
    contourFile = new File([blob], "contour_image.png", { type: "image/png" });

    /*
    const base64Image = `data:image/png;base64,${data.contour_image}`;
    console.log(
      "%c ",
      `font-size: 100px; background: url(${base64Image}) no-repeat; background-size: contain;`
    );
    */
  }

  let ellipseEquation = null;
  if (data.ellipse_equation) {
    ellipseEquation = data.ellipse_equation;
  }

  return { contourFile, ellipseEquation };
}
