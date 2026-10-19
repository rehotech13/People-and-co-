import React, { useState, useEffect } from 'react';
import {
  Building2,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Tag,
  ArrowRight,
  Plus,
  Search,
  SlidersHorizontal,
  RotateCcw,
  Eye,
  X,
  Phone,
  MessageSquare,
  CheckCircle2,
  Trash2,
  Layers
} from 'lucide-react';
import { PropertyListing } from '../types';
import { DEMONSTRATION_PROPERTIES, COMPANY_CONFIG } from '../config/company';
import { AddPropertyModal } from './AddPropertyModal';

interface PropertyListingsSectionProps {
  onEnquireProperty: (propertyTitle: string) => void;
}

export const PropertyListingsSection: React.FC<PropertyListingsSectionProps> = ({
  onEnquireProperty,
}) => {
  const [properties, setProperties] = useState<PropertyListing[]>(DEMONSTRATION_PROPERTIES);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Filters State
  const [statusFilter, setStatusFilter] = useState<'all' | 'for_sale' | 'for_lease' | 'joint_venture'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'commercial' | 'residential' | 'land' | 'industrial'>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [minCustomPrice, setMinCustomPrice] = useState<string>('');
  const [maxCustomPrice, setMaxCustomPrice] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  // Fetch properties from server API
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/properties');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.properties)) {
          setProperties(data.properties);
        }
      }
    } catch (err) {
      console.warn('Using client memory listings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handlePropertyAdded = (newProp: PropertyListing) => {
    setProperties((prev) => [newProp, ...prev]);
    setActionNotice(`Listing "${newProp.title}" was successfully published to the registry!`);
    setTimeout(() => setActionNotice(null), 5000);
  };

  const handleDeleteProperty = async (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    if (!confirm(`Are you sure you want to delete the listing "${title}"?`)) return;

    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id));
        if (selectedProperty?.id === id) {
          setSelectedProperty(null);
        }
        setActionNotice(`Listing "${title}" removed.`);
        setTimeout(() => setActionNotice(null), 4000);
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const resetFilters = () => {
    setStatusFilter('all');
    setTypeFilter('all');
    setLocationFilter('all');
    setPriceRange('all');
    setMinCustomPrice('');
    setMaxCustomPrice('');
    setSearchQuery('');
    setSortBy('newest');
  };

  // Derive unique locations for filter dropdown
  const uniqueLocations = Array.from(
    new Set(
      properties.map((p) => {
        if (p.location.toLowerCase().includes('eku')) return 'Eku Axis';
        if (p.location.toLowerCase().includes('abraka')) return 'Abraka Axis';
        if (p.location.toLowerCase().includes('warri')) return 'Warri Axis';
        if (p.location.toLowerCase().includes('asaba')) return 'Asaba Axis';
        if (p.location.toLowerCase().includes('ethiope')) return 'Ethiope East LGA';
        return p.location.split(',')[0].trim();
      })
    )
  );

  // Filter logic
  const filteredProperties = properties
    .filter((prop) => {
      // Status filter
      if (statusFilter !== 'all' && prop.status !== statusFilter) return false;

      // Type filter
      if (typeFilter !== 'all' && prop.type !== typeFilter) return false;

      // Location filter
      if (locationFilter !== 'all') {
        const locLower = prop.location.toLowerCase();
        const filterKeyword = locationFilter.replace(' Axis', '').replace(' LGA', '').toLowerCase();
        if (!locLower.includes(filterKeyword)) return false;
      }

      // Price preset filter
      if (priceRange !== 'all') {
        if (priceRange === 'under_10m' && prop.priceRaw >= 10000000) return false;
        if (priceRange === '10m_30m' && (prop.priceRaw < 10000000 || prop.priceRaw > 30000000)) return false;
        if (priceRange === '30m_60m' && (prop.priceRaw < 30000000 || prop.priceRaw > 60000000)) return false;
        if (priceRange === 'above_60m' && prop.priceRaw <= 60000000) return false;
      }

      // Custom Price range inputs
      if (minCustomPrice) {
        const minVal = parseFloat(minCustomPrice);
        if (!isNaN(minVal) && prop.priceRaw < minVal) return false;
      }
      if (maxCustomPrice) {
        const maxVal = parseFloat(maxCustomPrice);
        if (!isNaN(maxVal) && prop.priceRaw > maxVal) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(q);
        const matchesDesc = prop.description.toLowerCase().includes(q);
        const matchesLoc = prop.location.toLowerCase().includes(q);
        const matchesFeatures = prop.features?.some((f) => f.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesFeatures) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceRaw - b.priceRaw;
      if (sortBy === 'price_desc') return b.priceRaw - a.priceRaw;
      return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    });

  return (
    <section id="properties" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0B2545] mb-2">
              <span>Real Estate & Land Registry</span>
              <span aria-hidden="true">·</span>
              <span>Direct Property Opportunities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight font-['Plus_Jakarta_Sans']">
              Featured Properties & Land Assets
            </h2>
            <p className="mt-2 text-base text-slate-600 leading-relaxed">
              Explore verified residential developments, commercial parcels, and prime lands along the New Eku-Abraka Expressway and across Delta State.
            </p>
          </div>

          {/* Action to Add New Property */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-[#0B2545] hover:bg-[#07172B] active:scale-[0.99] rounded-xl transition-all shadow-sm hover:shadow cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#F59E0B]" />
              <span>Add New Property</span>
            </button>
          </div>
        </div>

        {/* Action Notice Toast */}
        {actionNotice && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{actionNotice}</span>
            </div>
            <button
              onClick={() => setActionNotice(null)}
              className="text-emerald-700 hover:text-emerald-950 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filtering & Search Toolbar */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 mb-10 space-y-4">
          
          {/* Top Row: Search + Quick Category Tabs + Sort */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, location, or amenities (e.g. Duplex, Eku, Borehole)..."
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Type Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl overflow-x-auto shrink-0">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'residential', label: 'Residential' },
                { id: 'commercial', label: 'Commercial' },
                { id: 'land', label: 'Land / Plots' },
                { id: 'industrial', label: 'Industrial' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTypeFilter(tab.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    typeFilter === tab.id
                      ? 'bg-white text-[#0B2545] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Advanced Filters Toggle & Sort */}
            <div className="flex items-center gap-2 shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-700 cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>

              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`p-2 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  showAdvancedFilters || locationFilter !== 'all' || priceRange !== 'all' || statusFilter !== 'all'
                    ? 'bg-[#0B2545] text-white border-[#0B2545]'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
                title="Toggle detailed filters"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {(statusFilter !== 'all' || typeFilter !== 'all' || locationFilter !== 'all' || priceRange !== 'all' || searchQuery || minCustomPrice || maxCustomPrice) && (
                <button
                  onClick={resetFilters}
                  className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-200 transition-colors"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Expandable Advanced Filters Row */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in slide-in-from-top-2 duration-150">
              
              {/* Location Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Location Corridor
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="all">All Locations (Delta State)</option>
                  {uniqueLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Acquisition Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="for_sale">For Sale (Outright)</option>
                  <option value="for_lease">For Lease / Rent</option>
                  <option value="joint_venture">Joint Venture</option>
                </select>
              </div>

              {/* Price Range Preset */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Price Bracket
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(e.target.value);
                    setMinCustomPrice('');
                    setMaxCustomPrice('');
                  }}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="all">Any Price</option>
                  <option value="under_10m">Under ₦10,000,000</option>
                  <option value="10m_30m">₦10,000,000 – ₦30,000,000</option>
                  <option value="30m_60m">₦30,000,000 – ₦60,000,000</option>
                  <option value="above_60m">Above ₦60,000,000</option>
                </select>
              </div>

            </div>
          )}

          {/* Active Results Count & Current Filter Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div>
              Showing <span className="font-bold text-slate-900 font-mono tabular-nums">{filteredProperties.length}</span> of {properties.length} listings
            </div>
            {filteredProperties.length === 0 && (
              <button
                onClick={resetFilters}
                className="text-[#00B4D8] font-semibold underline hover:text-[#0B2545]"
              >
                Clear filters to show all listings
              </button>
            )}
          </div>

        </div>

        {/* Property Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No matching properties found</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
              We couldn't find any properties matching your current filter criteria. Try broadening your price bracket or location selection.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100"
              >
                Reset Filters
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0B2545] rounded-lg hover:bg-[#07172B]"
              >
                Add Custom Property
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <div
                key={prop.id}
                onClick={() => {
                  setSelectedProperty(prop);
                  setActiveImageIndex(0);
                }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer relative"
              >
                {/* Image Section */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-md text-[#0B2545] shadow-xs">
                      {prop.typeLabel}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold px-2.5 py-1 bg-[#0B2545]/85 backdrop-blur-md rounded-md text-[#00B4D8]">
                        {prop.statusLabel}
                      </span>
                      
                      {/* Delete option for user added properties */}
                      {!prop.isDemonstration && (
                        <button
                          onClick={(e) => handleDeleteProperty(e, prop.id, prop.title)}
                          className="p-1 rounded-md bg-black/60 hover:bg-rose-600 text-white transition-colors"
                          title="Delete this listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <div className="text-[11px] text-slate-300 font-medium">Verified Asking Price</div>
                      <div className="text-xl font-extrabold tracking-tight text-white font-mono tabular-nums">
                        {prop.price}
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs text-white/90 bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      <Eye className="w-3.5 h-3.5 text-[#00B4D8]" />
                      <span>Quick View</span>
                    </span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0B2545] mb-2 font-['Plus_Jakarta_Sans'] group-hover:text-[#00B4D8] transition-colors leading-snug">
                      {prop.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-[#00B4D8] shrink-0" />
                      <span className="truncate">{prop.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      {prop.description}
                    </p>

                    {/* Dimensions & Bedrooms */}
                    <div className="flex items-center gap-4 text-xs text-slate-600 py-3 border-y border-slate-100 mb-4">
                      <div className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
                        <span>{prop.size}</span>
                      </div>
                      {typeof prop.bedrooms === 'number' && prop.bedrooms > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.bedrooms} Beds</span>
                        </div>
                      )}
                      {typeof prop.bathrooms === 'number' && prop.bathrooms > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Bath className="w-3.5 h-3.5 text-slate-400" />
                          <span>{prop.bathrooms} Baths</span>
                        </div>
                      )}
                    </div>

                    {/* Features Tags */}
                    {prop.features && prop.features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {prop.features.slice(0, 3).map((feat, i) => (
                          <span
                            key={i}
                            className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                          >
                            {feat}
                          </span>
                        ))}
                        {prop.features.length > 3 && (
                          <span className="text-[11px] text-slate-400 px-1 py-0.5">
                            +{prop.features.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Enquire Action */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnquireProperty(prop.title);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-[#0B2545] bg-[#F59E0B]/15 hover:bg-[#F59E0B] hover:text-[#0B2545] rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Enquire About This Property</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Property Quick View & Inspection Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Image Carousel Header */}
            <div className="relative aspect-video sm:aspect-21/9 w-full bg-slate-900 overflow-hidden">
              <img
                src={
                  selectedProperty.images && selectedProperty.images[activeImageIndex]
                    ? selectedProperty.images[activeImageIndex]
                    : selectedProperty.image
                }
                alt={selectedProperty.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Multi-image indicators if gallery exists */}
              {selectedProperty.images && selectedProperty.images.length > 1 && (
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  {selectedProperty.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-12 h-8 rounded border-2 overflow-hidden transition-all cursor-pointer ${
                        activeImageIndex === idx ? 'border-[#00B4D8] scale-105' : 'border-white/50 opacity-70'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Price Banner */}
              <div className="absolute bottom-4 right-6 text-right text-white">
                <div className="text-xs text-slate-300">Asking Price</div>
                <div className="text-2xl font-extrabold font-mono tabular-nums text-white">
                  {selectedProperty.price}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00B4D8] mb-1">
                    <span>{selectedProperty.typeLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#0B2545]">{selectedProperty.statusLabel}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B2545] font-['Plus_Jakarta_Sans']">
                    {selectedProperty.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-4 h-4 text-[#00B4D8]" />
                    <span>{selectedProperty.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/${COMPANY_CONFIG.contact.whatsapp}?text=Hello%20People%20and%20Co%20Construction%20Firm,%20I%20am%20interested%20in%20inspecting%20the%20property%20listing:%20${encodeURIComponent(selectedProperty.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-lg transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Inspect on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Dimensions</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">{selectedProperty.size}</div>
                </div>
                {typeof selectedProperty.bedrooms === 'number' && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Bedrooms</div>
                    <div className="text-sm font-bold text-slate-800 mt-0.5">{selectedProperty.bedrooms} Ensuite</div>
                  </div>
                )}
                {typeof selectedProperty.bathrooms === 'number' && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-[11px] text-slate-400 uppercase font-semibold">Bathrooms</div>
                    <div className="text-sm font-bold text-slate-800 mt-0.5">{selectedProperty.bathrooms} Baths</div>
                  </div>
                )}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Direct Broker</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">{COMPANY_CONFIG.shortName} Vetted</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Property Description
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {selectedProperty.description}
                </p>
              </div>

              {/* Amenities */}
              {selectedProperty.features && selectedProperty.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Verified Highlights & Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                    {selectedProperty.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-[#00B4D8] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notice */}
              <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-xl text-xs text-sky-900 leading-relaxed">
                <strong>Inspection & Due Diligence Advisory:</strong> Physical site visits, boundary surveys, and title deeds verification can be arranged with our engineering agents at our Eku headquarters.
              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Official Hotline: {COMPANY_CONFIG.contact.phoneDisplay}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedProperty.title;
                    setSelectedProperty(null);
                    onEnquireProperty(title);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-[#0B2545] hover:bg-[#07172B] rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  Request Formal Inspection / Purchase Brief
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add Property Modal */}
      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onPropertyAdded={handlePropertyAdded}
      />
    </section>
  );
};
