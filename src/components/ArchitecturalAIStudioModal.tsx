import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Image as ImageIcon,
  Wand2,
  Download,
  ArrowRight,
  Loader2,
  AlertCircle,
  Check,
  RefreshCw,
  Sliders
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface ArchitecturalAIStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnquireWithConcept?: (conceptTitle: string, conceptImageUrl: string) => void;
}

export const ArchitecturalAIStudioModal: React.FC<ArchitecturalAIStudioModalProps> = ({
  isOpen,
  onClose,
  onEnquireWithConcept,
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'edit'>('generate');
  const [prompt, setPrompt] = useState(
    'Modern 4-bedroom executive duplex with cantilevered balcony, warm exterior lighting, and landscaped perimeter along New Eku-Abraka Road, Delta State'
  );
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '4:3' | '1:1' | '9:16'>('4:3');
  const [selectedBaseImage, setSelectedBaseImage] = useState<string>(
    '/images/service_building_construction_1792339538812.jpg'
  );
  const [customUploadImage, setCustomUploadImage] = useState<string>('');
  const [editInstruction, setEditInstruction] = useState(
    'Add contemporary solar roof panels, stamped concrete interlocked driveway, and modern perimeter gatehouse'
  );

  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const PRESET_BASE_IMAGES = [
    {
      label: 'Residential Construction Site',
      url: '/images/service_building_construction_1792339538812.jpg',
    },
    {
      label: 'Commercial Plaza & Atrium',
      url: '/images/project_commercial_plaza_1792339539199.jpg',
    },
    {
      label: 'High-Rise Architectural Frame',
      url: '/images/hero_construction_modern_1792339537125.jpg',
    },
    {
      label: 'Civil Earthworks Infrastructure',
      url: '/images/service_civil_engineering_1792339538398.jpg',
    },
  ];

  const PROMPT_IDEAS = [
    'Contemporary 5-bedroom smart duplex with double-volume glass living room and private swimming pool in Delta State',
    'Modern 4-story commercial corporate plaza with reflective curtain wall and landscaped executive parking',
    'Reinforced concrete dual-cell box culvert drainage infrastructure with stabilized asphalt feeder road',
    'Industrial warehouse and logistics steel-frame hangar with heavy-duty concrete apron and loading bays',
  ];

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomUploadImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateOrEdit = async () => {
    setLoading(true);
    setErrorDetails(null);
    setStatusMessage('Synthesizing photorealistic architectural visualization via gemini-nano-banana-2.1...');

    try {
      const body: any = {
        prompt: activeTab === 'generate' ? prompt : editInstruction,
        aspectRatio,
      };

      if (activeTab === 'edit') {
        const imageToUse = customUploadImage || selectedBaseImage;
        body.imageBase64 = imageToUse;
      }

      const res = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok && data.success && data.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setStatusMessage('Architectural concept rendered successfully!');
      } else {
        setErrorDetails(data.error || 'Failed to render architectural visual.');
        setStatusMessage(null);
      }
    } catch (err: any) {
      setErrorDetails('Network failure during image generation. Please try again.');
      setStatusMessage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2545] text-white flex items-center justify-between border-b border-[#07172B]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00B4D8] to-amber-400 text-[#0B2545] flex items-center justify-center font-extrabold shadow-sm">
              <Wand2 className="w-6 h-6 text-[#0B2545]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base font-['Plus_Jakarta_Sans'] text-white">
                  Architectural AI Concept Studio
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-[#00B4D8]">
                  gemini-nano-banana-2.1
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Generate high-resolution building prototypes or edit existing structural plans
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 p-1 bg-slate-200/80 rounded-xl">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'generate'
                  ? 'bg-white text-[#0B2545] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Text-to-Concept Generation
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'edit'
                  ? 'bg-white text-[#0B2545] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Edit Architectural Image
            </button>
          </div>

          {/* Aspect Ratio Selector */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-bold uppercase text-[10px]">Ratio:</span>
            {(['16:9', '4:3', '1:1', '9:16'] as const).map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`px-2 py-1 rounded text-[11px] font-semibold border transition-colors cursor-pointer ${
                  aspectRatio === ratio
                    ? 'bg-[#0B2545] text-white border-[#0B2545]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Body Split */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-5">
            {activeTab === 'generate' ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Architectural Text Prompt
                  </label>
                  <textarea
                    rows={4}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe building type, floor count, facade materials (glass, concrete, wood), exterior lighting, location corridor..."
                    className="w-full p-3.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
                  />
                </div>

                {/* Ideas */}
                <div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Inspiration Templates:
                  </div>
                  <div className="space-y-1.5">
                    {PROMPT_IDEAS.map((idea, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPrompt(idea)}
                        className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-sky-50 text-slate-700 hover:text-[#0B2545] border border-slate-200 text-xs transition-colors cursor-pointer line-clamp-1"
                      >
                        "{idea}"
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Select Base Architectural Image to Edit
                  </label>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {PRESET_BASE_IMAGES.map((preset, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedBaseImage(preset.url);
                          setCustomUploadImage('');
                        }}
                        className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all aspect-video ${
                          selectedBaseImage === preset.url && !customUploadImage
                            ? 'border-[#00B4D8] ring-2 ring-[#00B4D8]/30'
                            : 'border-slate-200 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[10px] px-1.5 rounded truncate max-w-[90%]">
                          {preset.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Edit / Modification Instruction
                  </label>
                  <textarea
                    rows={3}
                    value={editInstruction}
                    onChange={(e) => setEditInstruction(e.target.value)}
                    placeholder="e.g. Add solar panels on roof, replace driveway with stamped concrete, and add evening garden lighting..."
                    className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              onClick={handleGenerateOrEdit}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold text-white bg-[#0B2545] hover:bg-[#07172B] active:scale-[0.99] rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#00B4D8]" />
                  <span>Generating with gemini-nano-banana-2.1...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <span>
                    {activeTab === 'generate' ? 'Generate Concept Visual' : 'Apply AI Architectural Edit'}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Canvas / Preview Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden flex-1 min-h-[300px] flex items-center justify-center relative">
              {loading ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-300 border-t-[#00B4D8] animate-spin mx-auto" />
                  <p className="text-xs text-slate-600 font-medium animate-pulse">{statusMessage}</p>
                </div>
              ) : generatedImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={generatedImage}
                    alt="AI Generated Architectural Concept"
                    className="w-full h-full object-contain max-h-[420px] mx-auto"
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <a
                      href={generatedImage}
                      download="paccf-architectural-concept.png"
                      className="p-2 bg-black/70 hover:bg-black/90 text-white rounded-lg transition-colors flex items-center gap-1.5 text-xs"
                      title="Download full resolution concept"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </a>
                  </div>
                </div>
              ) : errorDetails ? (
                <div className="p-6 text-center max-w-sm space-y-3">
                  <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                  <div className="text-xs text-slate-700 leading-relaxed font-medium">
                    {errorDetails}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    You can also choose from our curated architectural portfolio gallery below or consult our engineers directly.
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 space-y-2">
                  <ImageIcon className="w-10 h-10 mx-auto opacity-50" />
                  <p className="text-xs">
                    Your generated architectural concept visualization will render here.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Uses gemini-nano-banana-2.1 with 1K photorealistic resolution.
                  </p>
                </div>
              )}
            </div>

            {/* Actions for generated image */}
            {generatedImage && onEnquireWithConcept && (
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium">Like this concept?</span>
                <button
                  onClick={() => {
                    onEnquireWithConcept(
                      activeTab === 'generate' ? prompt : editInstruction,
                      generatedImage
                    );
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0B2545] bg-[#F59E0B] hover:bg-[#d97706] rounded-lg transition-colors cursor-pointer"
                >
                  <span>Request Engineering Feasibility Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
