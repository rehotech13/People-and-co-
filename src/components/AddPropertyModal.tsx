import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Check, Building2, MapPin, Tag, AlertCircle } from 'lucide-react';
import { PropertyListing } from '../types';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPropertyAdded: (newProp: PropertyListing) => void;
}

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
  onPropertyAdded,
}) => {
  const PRESET_IMAGES = [
    {
      label: 'Commercial Plaza / Office',
      url: '/images/project_commercial_plaza_1792339539199.jpg',
    },
    {
      label: 'Residential Construction / Duplex',
      url: '/images/service_building_construction_1792339538812.jpg',
    },
    {
      label: 'Contemporary Modern Facade & Crane',
      url: '/images/hero_construction_modern_1792339537125.jpg',
    },
    {
      label: 'Civil Engineering / Land Grading Site',
      url: '/images/service_civil_engineering_1792339538398.jpg',
    },
    {
      label: 'Structural Blueprint & Engineering Studio',
      url: '/images/service_structural_design_1792339538521.jpg',
    },
  ];

  const COMMON_AMENITIES = [
    'Registered Survey Plan',
    'Certificate of Occupancy (C of O)',
    'Direct Paved Road Access',
    'Perimeter Fencing',
    'Industrial Borehole Water',
    'Electricity / Dedicated Transformer',
    '24/7 Gated Security',
    'Dry Table Land',
    'Commercial High-Footfall Zone'
  ];

  const [title, setTitle] = useState('');
  const [type, setType] = useState<'residential' | 'commercial' | 'land' | 'industrial'>('residential');
  const [status, setStatus] = useState<'for_sale' | 'for_lease' | 'joint_venture'>('for_sale');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState<string>('');
  const [bathrooms, setBathrooms] = useState<string>('');
  const [size, setSize] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[1].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Registered Survey Plan',
    'Direct Paved Road Access'
  ]);
  const [customFeature, setCustomFeature] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleToggleAmenity = (amenity: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const handleAddCustomFeature = () => {
    if (customFeature.trim() && !selectedFeatures.includes(customFeature.trim())) {
      setSelectedFeatures((prev) => [...prev, customFeature.trim()]);
      setCustomFeature('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim() || title.trim().length < 3) {
      setErrorMsg('Please enter a descriptive property title (at least 3 characters).');
      return;
    }

    if (!location.trim() || location.trim().length < 2) {
      setErrorMsg('Please specify the property location (e.g. Eku, Abraka, Warri).');
      return;
    }

    const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(cleanPrice) || cleanPrice <= 0) {
      setErrorMsg('Please provide a valid property price in Naira (₦).');
      return;
    }

    if (!description.trim() || description.trim().length < 10) {
      setErrorMsg('Please provide a description (at least 10 characters).');
      return;
    }

    const finalImage = customImageUrl.trim() || selectedImage;

    setSubmitting(true);
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          type,
          status,
          price: cleanPrice,
          location,
          bedrooms: bedrooms ? parseInt(bedrooms, 10) : undefined,
          bathrooms: bathrooms ? parseInt(bathrooms, 10) : undefined,
          size: size.trim() || 'Standard plot',
          description,
          image: finalImage,
          images: [finalImage],
          features: selectedFeatures,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        onPropertyAdded(data.property);
        onClose();
      } else {
        setErrorMsg(data.error || 'Failed to add property listing.');
      }
    } catch {
      setErrorMsg('Network error while saving property listing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2545] text-white flex items-center justify-between border-b border-[#07172B]">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-[#00B4D8]" />
            <div>
              <h3 className="font-bold text-base font-['Plus_Jakarta_Sans']">
                Publish New Property / Land Listing
              </h3>
              <p className="text-xs text-slate-300">
                Register a verified development or land asset on the company portal
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

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form id="add-property-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Property Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 5-Bedroom Executive Duplex with Swimming Pool"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Type & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Property Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="residential">Residential Building</option>
                  <option value="commercial">Commercial Property</option>
                  <option value="land">Land / Plot</option>
                  <option value="industrial">Industrial Facility / Yard</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Listing Status <span className="text-rose-500">*</span>
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="for_sale">For Sale (Outright Purchase)</option>
                  <option value="for_lease">For Lease / Rent</option>
                  <option value="joint_venture">Joint Venture Development</option>
                </select>
              </div>
            </div>

            {/* Price & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Price in Naira (₦) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">₦</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="35000000"
                    min="1000"
                    step="1000"
                    className="w-full pl-8 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                <p className="mt-1 text-[11px] text-slate-400">e.g. 45000000 for ₦45,000,000</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Location / Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. New Eku-Abraka Road, Eku, Delta State"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bedrooms, Bathrooms & Size */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  placeholder="e.g. 4"
                  min="0"
                  max="50"
                  disabled={type === 'land'}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bathrooms
                </label>
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  placeholder="e.g. 5"
                  min="0"
                  max="50"
                  disabled={type === 'land'}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Plot / Floor Size
                </label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="e.g. 900 sq.m / 2 Plots"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Description & Specifications <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detail key architectural highlights, building condition, neighborhood characteristics, topography, and title specifics..."
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            {/* Property Image Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Property Visual Image <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Select an architectural photograph from PACCF's library or paste a custom web image link.
              </p>

              {/* Presets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-3">
                {PRESET_IMAGES.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedImage(preset.url);
                      setCustomImageUrl('');
                    }}
                    className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all aspect-video group ${
                      selectedImage === preset.url && !customImageUrl
                        ? 'border-[#00B4D8] ring-2 ring-[#00B4D8]/30'
                        : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {selectedImage === preset.url && !customImageUrl && (
                      <div className="absolute top-1 right-1 bg-[#00B4D8] text-white p-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                    <span className="sr-only">{preset.label}</span>
                  </div>
                ))}
              </div>

              {/* Custom Image URL fallback */}
              <div>
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="Or enter direct image URL (https://...)"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Features & Amenities */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Features & Amenities
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {COMMON_AMENITIES.map((amenity) => (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleToggleAmenity(amenity)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      selectedFeatures.includes(amenity)
                        ? 'bg-[#0B2545] text-white border-[#0B2545]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {selectedFeatures.includes(amenity) ? '✓ ' : '+ '}
                    {amenity}
                  </button>
                ))}
              </div>

              {/* Custom Feature Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customFeature}
                  onChange={(e) => setCustomFeature(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomFeature();
                    }
                  }}
                  placeholder="Add custom feature (e.g. Solar Inverter System)..."
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomFeature}
                  className="px-4 py-2 text-xs font-bold text-[#0B2545] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Add Tag
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Will be immediately visible in the active public listings
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-property-form"
              disabled={submitting}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#07172B] active:scale-[0.99] rounded-lg transition-all shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {submitting ? 'Publishing Listing...' : 'Publish Listing'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
