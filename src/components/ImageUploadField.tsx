import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, CheckCircle2, AlertCircle, Trash2, ExternalLink, RefreshCw } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  helpText?: string;
  previewShape?: 'rounded' | 'circle' | 'square' | 'wide';
  className?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://... یا آپلود فایل مستقیم',
  helpText,
  previewShape = 'rounded',
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'fallback' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadStatus('error');
      setStatusMessage('لطفاً یک فایل تصویری معتبر انتخاب کنید.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('idle');
    setStatusMessage('در حال پردازش و آپلود تصویر...');

    // 1. First read as DataURL for instant local preview and foolproof offline/iframe persistence
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target?.result as string;

      try {
        // Try uploading to api.php directly
        const formData = new FormData();
        formData.append('file', file);
        formData.append('action', 'upload_image');

        const response = await fetch('./api.php', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const resData = await response.json();
          if (resData && resData.status === 'success' && resData.url) {
            onChange(resData.url);
            setUploadStatus('success');
            setStatusMessage(`تصویر در پوشه download ذخیره شد (${resData.filename || 'موفق'})`);
            setIsUploading(false);
            return;
          }
        }
        
        // If response is not ok or not PHP server, fallback to base64
        onChange(base64Data);
        setUploadStatus('fallback');
        setStatusMessage('تصویر به صورت محلی و خودکار اضافه شد (آماده ذخیره).');
      } catch (err) {
        // On network error or dev preview environment, fallback to base64 DataURL smoothly
        onChange(base64Data);
        setUploadStatus('fallback');
        setStatusMessage('تصویر با موفقیت انتخاب و اضافه شد.');
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      setIsUploading(false);
      setUploadStatus('error');
      setStatusMessage('خطا در خواندن فایل تصویری.');
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const previewClass = {
    rounded: 'w-16 h-16 rounded-xl',
    circle: 'w-16 h-16 rounded-full',
    square: 'w-16 h-16 rounded-lg',
    wide: 'w-24 h-16 rounded-xl',
  }[previewShape];

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-200">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange('');
              setUploadStatus('idle');
              setStatusMessage('');
            }}
            className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
            <span>حذف تصویر</span>
          </button>
        )}
      </div>

      {/* Main Upload Box & Input Control */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-3 rounded-xl bg-slate-900 border transition-all ${
          isDragging
            ? 'border-purple-500 bg-purple-950/30'
            : 'border-slate-700/80 hover:border-slate-600'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Thumbnail preview */}
          {value ? (
            <div className="relative group flex-shrink-0">
              <div className={`${previewClass} overflow-hidden border border-purple-500/40 bg-slate-950 shadow-md`}>
                <img
                  src={value}
                  alt="پیش‌نمایش تصویر"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <a
                href={value}
                target="_blank"
                rel="noreferrer"
                className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-all text-white"
                title="مشاهده سایز اصلی تصویر"
              >
                <ExternalLink className="w-4 h-4 text-purple-300" />
              </a>
            </div>
          ) : (
            <div className={`${previewClass} flex-shrink-0 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 flex items-center justify-center text-slate-600`}>
              <ImageIcon className="w-6 h-6" />
            </div>
          )}

          {/* Controls: URL Input + Direct Upload Button */}
          <div className="flex-1 w-full space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={value}
                onChange={(e) => {
                  onChange(e.target.value);
                  setUploadStatus('idle');
                }}
                placeholder={placeholder}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                dir="ltr"
              />

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all flex-shrink-0 disabled:opacity-50 cursor-pointer"
                title="انتخاب فایل عکس از سیستم یا موبایل برای آپلود در پوشه download"
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>آپلود...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>آپلود تصویر</span>
                  </>
                )}
              </button>
            </div>

            {/* Helper & Status hints */}
            <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
              {statusMessage ? (
                <div
                  className={`flex items-center gap-1 ${
                    uploadStatus === 'success' || uploadStatus === 'fallback'
                      ? 'text-emerald-400'
                      : uploadStatus === 'error'
                      ? 'text-rose-400'
                      : 'text-purple-300'
                  }`}
                >
                  {uploadStatus === 'success' || uploadStatus === 'fallback' ? (
                    <CheckCircle2 className="w-3 h-3" />
                  ) : (
                    <AlertCircle className="w-3 h-3" />
                  )}
                  <span>{statusMessage}</span>
                </div>
              ) : (
                <span className="text-slate-400">
                  {helpText || 'می‌توانید عکس را مستقیماً آپلود کنید یا آدرس (URL) آن را وارد نمایید.'}
                </span>
              )}

              <span className="text-slate-500 hidden sm:inline-block">
                (پشتیبانی از Drag & Drop)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
