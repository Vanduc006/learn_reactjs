import React, { useState, useEffect } from 'react';

interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}

interface District {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards: Ward[];
}

interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}

interface ConversionResult {
  success: boolean;
  original_address: string;
  suggestions: Array<{
    newAddress: string;
    confidence: number;
    province: string;
    provinceName: string;
    wardName: string;
    wardCode: string;
    oldUnits: string[];
    matchType: string;
  }>;
  total_suggestions: number;
  error: string | null;
  conversion_info: {
    method: string;
    confidence_explanation: Record<string, string>;
  };
}

interface Statistics {
  success: boolean;
  generated_at: string;
  version: string;
  summary: {
    total_records: number;
    total_provinces: number;
    total_wards: number;
    wards_with_merger: number;
    wards_without_merger: number;
    ward_merger_rate: number;
    total_old_units: number;
    average_old_units_per_merged_ward: number;
    provinces: {
      total: number;
      with_merger: number;
      without_merger: number;
      merger_rate: number;
    };
    data_quality: {
      wards_with_code: number;
      wards_with_code_rate: number;
      provinces_with_complete_info: number;
      provinces_with_complete_info_rate: number;
    };
    ward_types: {
      phuong: number;
      xa: number;
      thi_tran: number;
      other: number;
      phuong_rate: number;
      xa_rate: number;
      thi_tran_rate: number;
    };
    province_types: {
      thanh_pho_trung_uong: number;
      tinh: number;
      thanh_pho_trung_uong_rate: number;
      tinh_rate: number;
    };
  };
  top_provinces_by_wards: Array<{
    name: string;
    province_code: string;
    total_wards: number;
    merged_wards: number;
    merger_rate: number;
    is_merged: boolean;
    administrative_center: string | null;
    merged_with: string[];
  }>;
}

const Hanhchinh: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  
  const [conversionResult, setConversionResult] = useState<ConversionResult | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(false);
  const [provincesLoading, setProvincesLoading] = useState(false);
  const [districtsLoading, setDistrictsLoading] = useState(false);
  const [wardsLoading, setWardsLoading] = useState(false);
  const [error, setError] = useState('');
  const [useFullAddress, setUseFullAddress] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  // Fetch provinces on component mount
  useEffect(() => {
    fetchProvinces();
    fetchStatistics();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (selectedProvince) {
      fetchDistricts(selectedProvince.code);
      setSelectedDistrict(null);
      setSelectedWard(null);
      setDistricts([]);
      setWards([]);
    } else {
      setDistricts([]);
      setWards([]);
      setSelectedDistrict(null);
      setSelectedWard(null);
    }
  }, [selectedProvince]);

  // Fetch wards when district changes
  useEffect(() => {
    if (selectedDistrict) {
      fetchWards(selectedDistrict.code);
      setSelectedWard(null);
      setWards([]);
    } else {
      setWards([]);
      setSelectedWard(null);
    }
  }, [selectedDistrict]);

  const fetchProvinces = async () => {
    setProvincesLoading(true);
    try {
      const response = await fetch('https://provinces.open-api.vn/api/p/');
      const data = await response.json();
      setProvinces(data);
    } catch (err) {
      console.error('Error fetching provinces:', err);
      setError('Không thể tải danh sách tỉnh/thành phố');
    } finally {
      setProvincesLoading(false);
    }
  };

  const fetchDistricts = async (provinceCode: number) => {
    setDistrictsLoading(true);
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
      const data = await response.json();
      setDistricts(data.districts || []);
    } catch (err) {
      console.error('Error fetching districts:', err);
      setError('Không thể tải danh sách quận/huyện');
    } finally {
      setDistrictsLoading(false);
    }
  };

  const fetchWards = async (districtCode: number) => {
    setWardsLoading(true);
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
      const data = await response.json();
      setWards(data.wards || []);
    } catch (err) {
      console.error('Error fetching wards:', err);
      setError('Không thể tải danh sách phường/xã');
    } finally {
      setWardsLoading(false);
    }
  };

  const fetchStatistics = async () => {
    setStatsLoading(true);
    try {
      const response = await fetch('https://don-vi-hanh-chinh.vercel.app/api/stats');
      const data = await response.json();
      setStatistics(data);
    } catch (err) {
      console.error('Error fetching statistics:', err);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleConvert = async () => {
    if (!selectedWard) {
      setError('Vui lòng chọn đầy đủ Tỉnh/Thành phố, Quận/Huyện và Phường/Xã');
      return;
    }

    setLoading(true);
    setError('');
    setConversionResult(null);

    try {
      const fullAddress = `${selectedWard.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`;
      const addressToSend = useFullAddress ? fullAddress : selectedWard.name;
      
      const params = new URLSearchParams({
        address: addressToSend,
        province: selectedProvince?.name || ''
      });

      const response = await fetch(`https://don-vi-hanh-chinh.vercel.app/api/convert?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setConversionResult(data);
      } else {
        setError(data.error || 'Có lỗi xảy ra khi chuyển đổi địa chỉ');
      }
    } catch (err) {
      setError('Không thể kết nối đến API. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-100';
    if (confidence >= 0.8) return 'text-blue-600 bg-blue-100';
    if (confidence >= 0.5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.9) return 'Khớp chính xác';
    if (confidence >= 0.8) return 'Khớp tốt';
    if (confidence >= 0.5) return 'Khớp một phần';
    return 'Khớp thấp';
  };

  const getLocationAndConvert = async () => {
    if (!navigator.geolocation) {
      setLocationError('Trình duyệt của bạn không hỗ trợ định vị');
      return;
    }

    setLocationLoading(true);
    setLocationError('');
    setError('');

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Kiểm tra xem có phải ở Việt Nam không (rough check)
      if (latitude < 8.0 || latitude > 23.5 || longitude < 102.0 || longitude > 110.0) {
        setLocationError('Vị trí hiện tại không nằm trong lãnh thổ Việt Nam. Chỉ hỗ trợ chuyển đổi đơn vị hành chính Việt Nam.');
        return;
      }

      // Sử dụng Reverse Geocoding để lấy địa chỉ
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=vi`
      );
      
      if (!response.ok) {
        throw new Error('Không thể lấy thông tin địa chỉ');
      }

      const data = await response.json();
      
      if (!data.address) {
        setLocationError('Không thể xác định địa chỉ từ vị trí hiện tại');
        return;
      }

      // Tìm kiếm thông tin địa chỉ trong kết quả
      const address = data.address;
      let wardName = '';
      let districtName = '';
      let provinceName = '';

      // Tìm phường/xã
      if (address.suburb) {
        wardName = address.suburb;
      } else if (address.neighbourhood) {
        wardName = address.neighbourhood;
      } else if (address.city_district) {
        wardName = address.city_district;
      }

      // Tìm quận/huyện
      if (address.district) {
        districtName = address.district;
      } else if (address.city_district) {
        districtName = address.city_district;
      }

      // Tìm tỉnh/thành phố
      if (address.state) {
        provinceName = address.state;
      } else if (address.city) {
        provinceName = address.city;
      }

      if (!wardName) {
        setLocationError('Không thể xác định phường/xã từ vị trí hiện tại. Vui lòng chọn thủ công.');
        return;
      }

      // Tự động convert với thông tin đã có
      const addressToSend = useFullAddress && districtName && provinceName 
        ? `${wardName}, ${districtName}, ${provinceName}`
        : wardName;

      const params = new URLSearchParams({
        address: addressToSend,
        province: provinceName || ''
      });

      const convertResponse = await fetch(`https://don-vi-hanh-chinh.vercel.app/api/convert?${params}`);
      const convertData = await convertResponse.json();
      
      if (convertData.success) {
        setConversionResult(convertData);
        // Hiển thị thông tin vị trí đã lấy được
        setLocationError(`✅ Đã lấy vị trí: ${wardName}${districtName ? ', ' + districtName : ''}${provinceName ? ', ' + provinceName : ''}`);
      } else {
        setLocationError(convertData.error || 'Không thể chuyển đổi địa chỉ từ vị trí hiện tại');
      }

    } catch (err: any) {
      if (err.code === 1) {
        setLocationError('Bạn đã từ chối quyền truy cập vị trí. Vui lòng cho phép và thử lại.');
      } else if (err.code === 2) {
        setLocationError('Không thể xác định vị trí hiện tại. Vui lòng kiểm tra kết nối mạng.');
      } else if (err.code === 3) {
        setLocationError('Hết thời gian xác định vị trí. Vui lòng thử lại.');
      } else {
        setLocationError('Có lỗi xảy ra khi lấy vị trí: ' + (err.message || 'Lỗi không xác định'));
      }
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto text-black">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Chuyển Đổi Đơn Vị Hành Chính Việt Nam
          </h1>
          {/* <p className="text-lg text-gray-600">
            Từ cấu trúc cũ (3 cấp) sang cấu trúc mới (2 cấp) - 2024
          </p> */}
          
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
                <strong>Thông báo:</strong> 
                Theo Nghị quyết 76/2025/UBTVQH15 ngày 14/4/2025 (hiệu lực từ 15/4/2025) và Nghị quyết Quốc hội ngày 12/6/2025, từ ngày <strong>01/07/2025</strong>, Việt Nam chính thức áp dụng cơ cấu hành chính cấp tỉnh và cấp xã mới sau sáp nhập. Hãy sử dụng công cụ này để chuyển đổi địa chỉ cũ sang địa chỉ hành chính mới.
            </p>
          </div>
        </div>

        {/* App Promotion Section */}
        <div className="mt-6 mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200 shadow-sm">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-3">
                <img src="/favicon.svg" className="w-8 h-8 rounded-md" alt="MIND App"/>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-800">IMASIS MIND powerfull for your research</h3>
                  <p className="text-sm text-gray-600">With MIND you can deepdive into any topic you want, upload your PDF and chat with truth context</p>
                </div>
              </div>
              <a 
                href="/" 
                className="px-4 py-2 bg-[#4871f7] text-white font-medium rounded-lg transition duration-200 flex items-center space-x-2"
              >
                <span>Join MIND</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>

        <div className='text-sm flex gap-2 cursor-pointer items-center justify-content-center'>
          <div className='text-gray-500 font-bold'>
            By ducnv
          </div>

          <a href="https://www.instagram.com/_ducnv/">
            <svg 
            className='w-4 h-4'
            version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 56.7 56.7" enable-background="new 0 0 56.7 56.7">
              <g>
                <path d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7   c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z"/>
                <circle cx="41.5" cy="16.4" r="2.9"/>
                <path d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9   h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3   s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6   c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z"/>
              </g>
            </svg>
          </a>

          <a href="https://www.facebook.com/nguyen.uc.588620">
            <svg height="100%" className='w-4 h-4' version="1.1" viewBox="0 0 512 512" width="100%" xmlns="http://www.w3.org/2000/svg" ><path d="M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-106.468,0l0,-192.915l66.6,0l12.672,-82.621l-79.272,0l0,-53.617c0,-22.603 11.073,-44.636 46.58,-44.636l36.042,0l0,-70.34c0,0 -32.71,-5.582 -63.982,-5.582c-65.288,0 -107.96,39.569 -107.96,111.204l0,62.971l-72.573,0l0,82.621l72.573,0l0,192.915l-191.104,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Z"/></svg>
          </a>

        </div>
        <div className="grid lg:grid-cols-3 gap-8">
            
          {/* Conversion Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
                {/* Location Button */}
                <div className="my-5">
                  {/* <h4 className="font-medium text-gray-800 mb-3">Hoặc lấy vị trí hiện tại:</h4> */}
                  <button
                    onClick={getLocationAndConvert}
                    disabled={locationLoading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                  >
                    {locationLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang lấy vị trí...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Lấy vị trí hiện tại & Chuyển đổi
                      </>
                    )}
                  </button>
                  {locationError && (
                    <div className={`mt-3 p-3 rounded-lg text-sm ${
                      locationError.startsWith('✅') 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {locationError}
                    </div>
                  )}
                </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Chọn Đơn Vị Hành Chính Cũ
              </h2>
              
              <div className="space-y-6">
                {/* Province Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tỉnh/Thành phố *
                  </label>
                  <select
                    value={selectedProvince?.code || ''}
                    onChange={(e) => {
                      const province = provinces.find(p => p.code === parseInt(e.target.value));
                      setSelectedProvince(province || null);
                    }}
                    disabled={provincesLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Chọn Tỉnh/Thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.code} value={province.code}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                  {provincesLoading && (
                    <p className="text-sm text-gray-500 mt-1">Đang tải danh sách tỉnh/thành phố...</p>
                  )}
                </div>

                {/* District Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quận/Huyện *
                  </label>
                  <select
                    value={selectedDistrict?.code || ''}
                    onChange={(e) => {
                      const district = districts.find(d => d.code === parseInt(e.target.value));
                      setSelectedDistrict(district || null);
                    }}
                    disabled={!selectedProvince || districtsLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                      <option key={district.code} value={district.code}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  {districtsLoading && (
                    <p className="text-sm text-gray-500 mt-1">Đang tải danh sách quận/huyện...</p>
                  )}
                </div>

                {/* Ward Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phường/Xã *
                  </label>
                  <select
                    value={selectedWard?.code || ''}
                    onChange={(e) => {
                      const ward = wards.find(w => w.code === parseInt(e.target.value));
                      setSelectedWard(ward || null);
                    }}
                    disabled={!selectedDistrict || wardsLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.code} value={ward.code}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                  {wardsLoading && (
                    <p className="text-sm text-gray-500 mt-1">Đang tải danh sách phường/xã...</p>
                  )}
                </div>

                {/* Selected Address Display */}
                {selectedWard && (
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-1">Địa chỉ đã chọn:</p>
                    <p className="font-medium text-gray-800">
                      {selectedWard.name}, {selectedDistrict?.name}, {selectedProvince?.name}
                    </p>
                  </div>
                )}

                {/* Conversion Options */}
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-gray-800 mb-3">Tùy chọn chuyển đổi:</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="conversionType"
                        checked={useFullAddress}
                        onChange={() => setUseFullAddress(true)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-medium text-gray-800">Địa chỉ đầy đủ (3 cấp)</span>
                        <p className="text-sm text-gray-600">Sử dụng: {selectedWard?.name}, {selectedDistrict?.name}, {selectedProvince?.name}</p>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="conversionType"
                        checked={!useFullAddress}
                        onChange={() => setUseFullAddress(false)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <span className="font-medium text-gray-800">Chỉ tên phường/xã</span>
                        <p className="text-sm text-gray-600">Sử dụng: {selectedWard?.name}</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleConvert}
                  disabled={loading || !selectedWard}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang chuyển đổi...
                    </>
                  ) : (
                    'Chuyển Đổi Địa Chỉ'
                  )}
                </button>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}
              </div>

              {/* Conversion Results */}
              {conversionResult && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Kết Quả Chuyển Đổi
                  </h3>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">Địa chỉ gốc:</p>
                    <p className="font-medium text-gray-800">{conversionResult.original_address}</p>
                  </div>

                  {conversionResult.suggestions.length > 0 ? (
                    <div className="space-y-4">
                      {conversionResult.suggestions.map((suggestion, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg text-gray-800 mb-1">
                                {suggestion.newAddress}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Mã phường/xã: {suggestion.wardCode}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConfidenceColor(suggestion.confidence)}`}>
                              {getConfidenceText(suggestion.confidence)} ({Math.round(suggestion.confidence * 100)}%)
                            </span>
                          </div>

                          {suggestion.oldUnits.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium text-gray-700 mb-2">
                                Các đơn vị cũ đã được sáp nhập:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {suggestion.oldUnits.map((unit, unitIndex) => (
                                  <span key={unitIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                    {unit}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800">
                        Không tìm thấy kết quả chuyển đổi phù hợp. Vui lòng thử lại với địa chỉ khác.
                      </p>
                    </div>
                  )}

                  {conversionResult.conversion_info && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Phương thức:</strong> {conversionResult.conversion_info.method}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Statistics Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Thống Kê Tổng Quan
              </h2>

              {statsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : statistics ? (
                <div className="space-y-6">
                  {/* Overall Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {statistics.summary.total_provinces}
                      </div>
                      <div className="text-xs text-gray-600">Tỉnh/Thành</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {statistics.summary.total_wards.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">Phường/Xã</div>
                    </div>
                  </div>

                  {/* Merger Stats */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tỷ lệ sáp nhập:</span>
                      <span className="font-semibold text-green-600">
                        {statistics.summary.ward_merger_rate}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Đã sáp nhập:</span>
                      <span className="font-semibold text-blue-600">
                        {statistics.summary.wards_with_merger.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Chưa sáp nhập:</span>
                      <span className="font-semibold text-orange-600">
                        {statistics.summary.wards_without_merger.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Ward Types */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Phân loại đơn vị:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Phường:</span>
                        <span className="font-medium">{statistics.summary.ward_types.phuong.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Xã:</span>
                        <span className="font-medium">{statistics.summary.ward_types.xa.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Provinces */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Top 5 tỉnh có nhiều đơn vị:</h4>
                    <div className="space-y-2">
                      {statistics.top_provinces_by_wards.slice(0, 5).map((province, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="text-gray-600 truncate">{province.name}</span>
                          <span className="font-medium">{province.total_wards}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 text-center pt-4 border-t">
                    Cập nhật lần cuối: {new Date(statistics.generated_at).toLocaleDateString('vi-VN')}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Không thể tải thống kê
                </div>
              )}
            </div>
          </div>
        </div>

        

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Dữ liệu được cung cấp bởi API Đơn vị Hành chính Việt Nam v{statistics?.version || '2.1'} và [Vietnam Provinces API](https://provinces.open-api.vn/)
          </p>
          {/* <p className="text-xs mt-2">
            Công cụ này giúp người dân chuyển đổi địa chỉ từ cấu trúc hành chính cũ (3 cấp) sang cấu trúc mới (2 cấp)
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Hanhchinh;
