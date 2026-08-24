import { useEffect, useRef, useState } from "react";
import { BiCamera } from "react-icons/bi";

interface ImageUploadProps {
  onChange: (url: string) => void;
  label: string;
  value?: string
}

const ImageUpload = ({ onChange, label, value }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );

    const data = await response.json();
    setPreview(data.secure_url);
    onChange(data.secure_url);
    setLoading(false);
  };

  useEffect(() => {
  if (value) {
    setPreview(value)
  }
}, [value])

  return (
   <div className="flex flex-col mb-4">
      <label className="text-gray-300 font-bold mb-2 text-sm">{label}</label>
      {/* input escondido */}
      <input 
        ref={inputRef}
        type="file" 
        accept="image/*" 
        onChange={handleUpload}
        className="hidden"
      />
      {/* botão customizado que aciona o input */}
      <div 
        onClick={() => inputRef.current?.click()}
        className="flex items-center justify-center gap-2 h-10 bg-bgsite border border-gray-800 rounded-md cursor-pointer hover:border-cyan-900 text-gray-400 hover:text-gray-300"
      >
        <BiCamera />
        <span className="text-sm">
          {loading ? "Enviando..." : "Escolher imagem"}
        </span>
      </div>
      {/* preview da imagem */}
      {preview && (
        <img src={preview} className="mt-2 h-20 object-cover rounded-md" />
      )}
    </div>
  );
};

export default ImageUpload;
