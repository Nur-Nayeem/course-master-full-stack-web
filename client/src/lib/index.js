import axios from "axios";

export const imageUpload = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  try {
    const imageApiUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Image_Host
    }`;
    const { data } = await axios.post(imageApiUrl, formData);
    return data?.data?.display_url;
  } catch (err) {
    console.log(err);
  }
};
