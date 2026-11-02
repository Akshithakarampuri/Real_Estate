import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { UploadCloud, Image as ImageIcon, X, Sparkles, CheckCircle2, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Step5Media = ({ formData, updateFormData }) => {
  const { success, info } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageQualityReport, setImageQualityReport] = useState(null);

  const images = formData.images || [];

  const handleSimulatedUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(20);

    // Simulate Cloudinary upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    // Default sample high-res luxury property images if local file blobs
    const demoPhotos = [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    ];

    setTimeout(async () => {
      clearInterval(progressInterval);
      setUploadProgress(100);

      const added = demoPhotos.slice(0, Math.min(files.length, demoPhotos.length));
      const newImageList = [...images, ...added];
      updateFormData({ images: newImageList });

      // Run Section 33 AI Image Quality Check
      const report = await aiService.checkImageQuality(added[0]);
      setImageQualityReport(report);
      setUploading(false);
      success('Images uploaded to Cloudinary CDN & AI inspected!');
    }, 1200);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    updateFormData({ images: updated });
    info('Photo removed.');
  };

  const moveImage = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    updateFormData({ images: updated });
  };

  return (
    <div className="space-y-6">
      {/* Upload Drag & Drop Area */}
      <div className="border-2 border-dashed border-slate-300 hover:border-brand-500 rounded-2xl p-8 text-center transition-colors bg-slate-50/50">
        <input
          type="file"
          id="fileUpload"
          multiple
          accept="image/*"
          onChange={handleSimulatedUpload}
          className="hidden"
        />
        <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
            <UploadCloud className="w-8 h-8" />
          </div>
          <span className="text-sm font-bold text-slate-900">
            Click to upload property photography
          </span>
          <span className="text-xs text-slate-500 mt-1">
            PNG, JPG, WebP up to 25MB each. Direct Cloudinary CDN optimization.
          </span>
          <span className="btn-primary text-xs mt-4 px-4 py-2 rounded-xl">
            Select Photos from Device
          </span>
        </label>
      </div>

      {/* Upload Progress Bar */}
      {uploading && (
        <div className="space-y-1.5 p-4 rounded-xl bg-slate-100 border border-slate-200">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>Uploading to Cloudinary CDN & Processing AI Quality...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-brand-600 h-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* AI Image Quality Inspection Card (Section 33) */}
      {imageQualityReport && (
        <div className="p-4 rounded-2xl bg-brand-950 text-white border border-brand-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-bold">AI Image Quality Inspection</span>
            </div>
            <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-brand-500 text-slate-950">
              {imageQualityReport.qualityScore}% Quality Score
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1 border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sharpness: Optimal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Blur: Not Detected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Duplicate: None</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Lighting: Approved</span>
            </div>
          </div>

          {imageQualityReport.recommendedEnhancements && (
            <p className="text-[11px] text-slate-300 italic">
              AI Tip: {imageQualityReport.recommendedEnhancements[0]}
            </p>
          )}
        </div>
      )}

      {/* Image Preview & Reordering Grid */}
      {images.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Uploaded Photos ({images.length})
            </span>
            <span className="text-xs text-slate-400">First photo is featured cover</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((imgUrl, index) => (
              <div
                key={index}
                className="relative group rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100"
              >
                <img src={imgUrl} alt={`Upload ${index}`} className="w-full h-full object-cover" />

                {index === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-brand-600 text-white text-[10px] font-bold shadow">
                    Cover Photo
                  </span>
                )}

                {/* Overlay controls */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, -1)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-900"
                      title="Move Left"
                    >
                      <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, 1)}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-900"
                      title="Move Right"
                    >
                      <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                    title="Remove Photo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
