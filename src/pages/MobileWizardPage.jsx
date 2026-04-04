import React, { useState } from 'react';
import { Signal, Wifi, Battery, ChevronDown, Home, User, Upload, FileText, Check, ChevronLeft, Search, PlusSquare } from 'lucide-react';

const translations = {
    en: {
        step: "Step",
        of: "of",
        customerData: "Customer Data",
        personalInfo: "Personal Info",
        fullName: "Full Name",
        namePlaceholder: "Full Name",
        address: "Address",
        selectAddress: "Select Address",
        propertyType: "Property Type",
        selectType: "Select Type",
        apartment: "Apartment",
        detachedHouse: "Detached House",
        condo: "Condominium",
        propertyName: "Property Name",
        propertyPlaceholder: "Property Name",
        submit: "Submit",
        documents: "Documents",
        uploads: "Uploads",
        energyCert: "Energy Certificate",
        heatingContractor: "Heating Contractor",
        continue: "Next",
        noFileChosen: "No file chosen",
        success: "Success",
        successMsg: "Data saved securely.",
        backToStart: "Back to Home",
        submitting: "Sending...",
        errorMsg: "Failed to save. Try again."
    },
    de: {
        step: "Schritt",
        of: "von",
        customerData: "Kundendaten",
        personalInfo: "Persönliche Info",
        fullName: "Name",
        namePlaceholder: "Vollständiger Name",
        address: "Adresse",
        selectAddress: "Adresse auswählen",
        propertyType: "Immobilientyp",
        selectType: "Typ auswählen",
        apartment: "Wohnung",
        detachedHouse: "Einfamilienhaus",
        condo: "Eigentumswohnung",
        propertyName: "Immobilie",
        propertyPlaceholder: "Name der Immobilie",
        submit: "Einreichen",
        documents: "Dokumente",
        uploads: "Uploads",
        energyCert: "Energieausweis",
        heatingContractor: "Heizungsbauer",
        continue: "Weiter",
        noFileChosen: "Keine Datei ausgewählt",
        success: "Erfolgreich",
        successMsg: "Daten wurden gespeichert.",
        backToStart: "Zurück",
        submitting: "Wird gesendet...",
        errorMsg: "Fehler beim Speichern."
    }
};

const API_BASE_URL = 'https://twilight-armstrong.onrender.com';

const MobileWizardPage = () => {
    const [step, setStep] = useState(2);
    const [lang, setLang] = useState('de');
    const t = translations[lang];

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        propertyDetails: '',
        property: ''
    });

    const [files, setFiles] = useState({
        energie: null,
        heizung: null
    });

    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleNext = () => {
        setErrorMessage('');
        if (!formData.name || !formData.address || !formData.propertyDetails || !formData.property) {
            setErrorMessage(lang === 'de' ? 'Bitte füllen Sie alle Pflichtfelder aus.' : 'Please fill all mandatory fields.');
            return;
        }
        setStep(3);
    };

    const handleFileChange = (key, file) => {
        setFiles({ ...files, [key]: file });
    };

    const handleSubmit = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        
        if (!files.energie || !files.heizung) {
            setErrorMessage(lang === 'de' ? 'Bitte laden Sie beide notwendigen Dokumente hoch.' : 'Please upload both mandatory documents.');
            return;
        }
        
        setSubmitting(true);

        const submitData = new FormData();
        submitData.append('name', formData.name);
        submitData.append('address', formData.address);
        submitData.append('propertyDetails', formData.propertyDetails);
        submitData.append('property', formData.property);

        if (files.energie) submitData.append('energie', files.energie);
        if (files.heizung) submitData.append('heizung', files.heizung);

        try {
            const response = await fetch(`${API_BASE_URL}/api/submissions`, {
                method: 'POST',
                body: submitData,
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            await response.json();
            setSuccessMessage(t.successMsg);
            setStep(4);
        } catch (error) {
            console.error('Submission failed:', error);
            setErrorMessage(t.errorMsg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center p-4 font-sans relative overflow-hidden bg-zinc-100">
            <div className="w-full max-w-[375px] bg-white shadow-xl overflow-hidden border border-gray-200 relative min-h-[812px] z-10 flex flex-col items-center">

                <div className="h-[44px] w-full flex justify-between items-end px-5 pb-2 text-black shrink-0 bg-white z-20">
                    <span className="font-semibold text-[15px]">9:41</span>
                    <div className="flex items-center gap-1.5">
                        <Signal size={15} fill="currentColor" />
                        <Wifi size={15} />
                        <Battery size={20} fill="currentColor" />
                    </div>
                </div>

                <div className="w-full h-[44px] flex items-center justify-between px-4 shrink-0 bg-white border-b border-gray-200 relative z-10">
                    <button
                        className="p-1 hover:bg-gray-50 rounded-full"
                        onClick={() => step > 2 ? setStep(step - 1) : null}
                    >
                        <ChevronLeft size={28} className="text-black" />
                    </button>

                    <h1 className="text-[16px] font-semibold text-black tracking-tight">
                        {step < 4 ? `${t.step} ${step} ${t.of} 5` : t.success}
                    </h1>

                    <button
                        onClick={() => setLang(lang === 'de' ? 'en' : 'de')}
                        className="text-[14px] font-bold text-black"
                    >
                        {lang.toUpperCase()}
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 w-full bg-white relative pb-20">

                    {step === 2 ? (
                        <div className="animate-fade-in-up mt-6">
                            <h2 className="text-center text-[24px] mb-6 font-medium text-black tracking-tight">
                                {t.customerData}
                            </h2>

                            <div className="space-y-4">
                                <InstagramInput
                                    placeholder={t.namePlaceholder}
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />

                                <div className="relative">
                                    <select
                                        className="w-full bg-[#FAFAFA] border border-gray-300 text-[14px] px-4 py-3.5 rounded-[4px] text-black appearance-none focus:outline-none focus:border-gray-400"
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>{t.selectAddress}</option>
                                        <option value="1">123 Market St, San Francisco</option>
                                        <option value="2">456 Broadway Ave, New York</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                </div>

                                <div className="relative">
                                    <select
                                        className="w-full bg-[#FAFAFA] border border-gray-300 text-[14px] px-4 py-3.5 rounded-[4px] text-black appearance-none focus:outline-none focus:border-gray-400"
                                        value={formData.propertyDetails}
                                        onChange={(e) => setFormData({ ...formData, propertyDetails: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>{t.selectType}</option>
                                        <option value="apt">{t.apartment}</option>
                                        <option value="house">{t.detachedHouse}</option>
                                        <option value="condo">{t.condo}</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                                </div>

                                <InstagramInput
                                    placeholder={t.propertyPlaceholder}
                                    value={formData.property}
                                    onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mt-8">
                                {errorMessage && (
                                    <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
                                )}
                                <button
                                    onClick={handleNext}
                                    className="w-full bg-[#0095F6] hover:bg-[#1877F2] text-white font-semibold text-[14px] py-3.5 rounded-[8px] transition-colors"
                                >
                                    {t.submit}
                                </button>
                            </div>
                        </div>
                    ) : step === 3 ? (
                        <div className="animate-fade-in-up mt-6">
                            <h2 className="text-center text-[24px] mb-6 font-medium text-black tracking-tight">
                                {t.documents}
                            </h2>

                            <div className="space-y-4">
                                <InstagramUpload
                                    label={t.energyCert}
                                    emptyText={t.noFileChosen}
                                    value={files.energie}
                                    onChange={(f) => handleFileChange('energie', f)}
                                />
                                <InstagramUpload
                                    label={t.heatingContractor}
                                    emptyText={t.noFileChosen}
                                    value={files.heizung}
                                    onChange={(f) => handleFileChange('heizung', f)}
                                />
                            </div>

                            <div className="mt-8">
                                {errorMessage && (
                                    <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className={`w-full bg-[#0095F6] hover:bg-[#1877F2] text-white font-semibold text-[14px] py-3.5 rounded-[8px] transition-colors ${submitting ? 'opacity-70' : ''}`}
                                >
                                    {submitting ? t.submitting : t.continue}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-fade-in-up mt-16 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full border-[3px] border-[#0095F6] flex justify-center items-center mb-6">
                                <Check size={50} className="text-[#0095F6]" />
                            </div>

                            <h2 className="text-[22px] font-semibold text-black mb-2">{t.success}</h2>
                            <p className="text-[14px] text-gray-500 mb-8">{successMessage || t.successMsg}</p>

                            <button
                                onClick={() => {
                                    setStep(2);
                                    setFormData({
                                        name: '',
                                        address: '',
                                        propertyDetails: '',
                                        property: ''
                                    });
                                    setFiles({
                                        energie: null,
                                        heizung: null
                                    });
                                }}
                                className="text-[#0095F6] font-semibold text-[14px]"
                            >
                                {t.backToStart}
                            </button>
                        </div>
                    )}
                </div>

                <div className="h-[50px] w-full flex justify-around items-center bg-white border-t border-gray-200 shrink-0 absolute bottom-0 z-20 pb-safe">
                    <Home size={26} className="text-black" />
                    <Search size={26} className="text-black" />
                    <PlusSquare size={26} className="text-black" />
                    <Upload size={26} className="text-black" />
                    <div className="w-[28px] h-[28px] rounded-full border border-gray-300 bg-gray-100 overflow-hidden flex justify-center items-center">
                        <User size={18} className="text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const InstagramInput = ({ placeholder, value, onChange, required }) => (
    <div className="relative">
        <input
            type="text"
            className="w-full bg-[#FAFAFA] border border-gray-300 text-[14px] px-4 py-3.5 rounded-[4px] text-black placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    </div>
);

const InstagramUpload = ({ label, emptyText, value, onChange, required }) => (
    <div className="bg-[#FAFAFA] border border-gray-300 rounded-[4px] p-4 flex flex-col gap-2 relative">
        <span className="text-[14px] font-semibold text-black">{label}</span>

        <div className="flex items-center gap-2">
            <span className="text-[13px] text-gray-500 truncate">
                {value ? value.name : emptyText}
            </span>
        </div>

        <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            onChange={(e) => onChange(e.target.files[0])}
        />

        <div className="absolute top-4 right-4 text-[#0095F6]">
            {value ? <Check size={20} /> : <FileText size={20} />}
        </div>
    </div>
);

export default MobileWizardPage;