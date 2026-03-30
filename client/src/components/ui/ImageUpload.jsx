import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image } from 'lucide-react';

const ImageUpload = ({ onUpload, preview, onRemove, accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] }, maxSize = 5 * 1024 * 1024, className = '' }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, maxSize, multiple: false });

  if (preview) {
    return (
      <div className={`relative rounded-xl overflow-hidden ${className}`}>
        <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
        <button onClick={onRemove} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors">
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-carehire-500 bg-carehire-50' : 'border-slate-200 hover:border-carehire-400 hover:bg-slate-50'
      } ${className}`}
    >
      <input {...getInputProps()} />
      <Image size={32} className="mx-auto text-slate-400 mb-3" />
      <p className="text-sm text-slate-600 font-medium">{isDragActive ? 'Drop the file here' : 'Drag & drop or click to upload'}</p>
      <p className="text-xs text-slate-400 mt-1">PNG, JPG, GIF up to 5MB</p>
    </div>
  );
};

export default ImageUpload;
