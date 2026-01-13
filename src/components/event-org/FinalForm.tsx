"use client";
import React, { useState } from 'react';
import { ChevronDownIcon, PlusIcon, TrashIcon } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { EventFormData } from './validateEventform';

interface FinalFormProps {
    formData: EventFormData;
    setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    addArrayItem?: (arrayName: string, subField?: string, item?: any) => void;
    updateArrayField?: (arrayName: string, index: number, field: string, value: string) => void;
    removeArrayItem?: (arrayName: string, index: number) => void;
    formErrors: { [key: string]: string };
}

const FinalForm: React.FC<FinalFormProps> = ({
    formData,
    setFormData,
    handleInputChange,
    addArrayItem,
    formErrors = {},
}) => {
    const [openSections, setOpenSections] = useState({
        requirements: true,
        postEvent: true, // Default open or as per logic
    });

    const toggleSection = (section: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section as keyof typeof openSections],
        }));
    };

    const handleAddStallPrice = () => {
        setFormData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                stallsPrices: [
                    ...(prev.requirements?.stallsPrices || []),
                    { stallType: '', stallPrice: '' },
                ],
            },
        }));
    };

    const handleRemoveStallPrice = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                stallsPrices: prev.requirements.stallsPrices.filter((_, i) => i !== index),
            },
        }));
    };

    const handleStallPriceChange = (index: number, field: string, value: string) => {
        setFormData((prev) => {
            const newStallsPrices = [...prev.requirements.stallsPrices];
            newStallsPrices[index] = { ...newStallsPrices[index], [field]: value };
            return {
                ...prev,
                requirements: {
                    ...prev.requirements,
                    stallsPrices: newStallsPrices,
                }
            };
        });
    };

    const handleRequirementChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // name e.g. "requirements.artists"
        const field = name.split('.')[1];
        setFormData(prev => ({
            ...prev,
            requirements: {
                ...prev.requirements,
                [field]: value
            }
        }));
    };

    const handlePostEventChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // name e.g. "postEventFollowUp.thankYouNote"
        const field = name.split('.')[1];
        setFormData(prev => ({
            ...prev,
            postEventFollowUp: {
                ...prev.postEventFollowUp,
                [field]: value
            }
        }));
    };


    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", width: "100%" }}>
            {/* Requirements Section */}
            <div className="card" style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #7e7e7e',
                padding: '0px',
                boxShadow: 'none',
                maxWidth: '100%',
            }}>
                <div
                    onClick={() => toggleSection('requirements')}
                    style={{
                        padding: '30px 32px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                >
                    <h3 style={{ fontSize: '24px', fontWeight: 500, color: 'black' }}>
                        Requirements/Planning
                    </h3>
                    {openSections.requirements ? (
                        <ChevronDownIcon style={{ width: '24px', height: '24px', transform: 'rotate(180deg)', transition: 'transform 0.3s' }} />
                    ) : (
                        <ChevronDownIcon style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }} />
                    )}
                </div>

                {openSections.requirements && (
                    <div className="card-content" style={{ padding: '0 32px 32px' }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "16px" }}>
                            {/* Artists/Singers and Stalls Availability - Split View */}
                            <div className="form-row" style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                                <div style={{ position: "relative", flex: "1 1 300px", minWidth: "0" }}>
                                    <label style={{
                                        position: "absolute",
                                        top: "-10px",
                                        left: "12px",
                                        backgroundColor: "white",
                                        padding: "0 4px",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#374151",
                                        zIndex: 1
                                    }}>
                                        Artists / Singers / Special Guests
                                    </label>
                                    <Select
                                        value={formData.requirements?.artists}
                                        onValueChange={(value) => handleRequirementChange({ target: { name: 'requirements.artists', value } } as any)}
                                    >
                                        <SelectTrigger
                                            style={{
                                                width: "100%",
                                                height: "48px",
                                                padding: "12px 16px",
                                                border: "1px solid #9ca3af",
                                                borderRadius: "4px",
                                                fontSize: "14px",
                                                outline: "none",
                                                color: "#1f2937",
                                                marginBottom: "0px" // reset default margin if any
                                            }}
                                        >
                                            <SelectValue placeholder="Select or type requirements" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Sound System Required">Sound System Required</SelectItem>
                                            <SelectItem value="Green Room Required">Green Room Required</SelectItem>
                                            <SelectItem value="Backstage Access">Backstage Access</SelectItem>
                                            <SelectItem value="Personal Makeup Artist">Personal Makeup Artist</SelectItem>
                                            <SelectItem value="Transportation Included">Transportation Included</SelectItem>
                                            <SelectItem value="Accommodation Required">Accommodation Required</SelectItem>
                                            <SelectItem value="Special Dietary Needs">Special Dietary Needs</SelectItem>
                                            <SelectItem value="Security Personnel">Security Personnel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formErrors["requirements.artists"] && (
                                        <span style={{ color: "red", fontSize: "12px", position: "absolute", bottom: "-20px", left: "0" }}>{formErrors["requirements.artists"]}</span>
                                    )}
                                </div>

                                <div style={{ position: "relative", flex: "1 1 300px", minWidth: "0" }}>
                                    <label style={{
                                        position: "absolute",
                                        top: "-10px",
                                        left: "12px",
                                        backgroundColor: "white",
                                        padding: "0 4px",
                                        fontSize: "12px",
                                        fontWeight: 500,
                                        color: "#374151",
                                        zIndex: 1
                                    }}>
                                        Stalls Availability
                                    </label>
                                    <Select
                                        value={formData.requirements?.stallsAvailability}
                                        onValueChange={(value) => handleRequirementChange({ target: { name: 'requirements.stallsAvailability', value } } as any)}
                                    >
                                        <SelectTrigger
                                            style={{
                                                width: "100%",
                                                height: "48px",
                                                padding: "12px 16px",
                                                border: "1px solid #9ca3af",
                                                borderRadius: "4px",
                                                fontSize: "14px",
                                                outline: "none",
                                                color: "#1f2937",
                                                marginBottom: "0px"
                                            }}
                                        >
                                            <SelectValue placeholder="Select or type availability" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Available">Available</SelectItem>
                                            <SelectItem value="Limited Availability">Limited Availability</SelectItem>
                                            <SelectItem value="Not Available">Not Available</SelectItem>
                                            <SelectItem value="Pre-booking Required">Pre-booking Required</SelectItem>
                                            <SelectItem value="First Come First Serve">First Come First Serve</SelectItem>
                                            <SelectItem value="By Invitation Only">By Invitation Only</SelectItem>
                                            <SelectItem value="Contact for Availability">Contact for Availability</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formErrors["requirements.stallsAvailability"] && (
                                        <span style={{ color: "red", fontSize: "12px", position: "absolute", bottom: "-20px", left: "0" }}>{formErrors["requirements.stallsAvailability"]}</span>
                                    )}
                                </div>
                            </div>

                            {/* Stalls Prices */}
                            <div style={{ marginTop: "8px" }}>
                                <div className="stalls-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                                    <label style={{ fontSize: "16px", fontWeight: 500, color: "black" }}>Stalls</label>
                                    <button
                                        type="button"
                                        onClick={handleAddStallPrice}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            background: "none",
                                            border: "none",
                                            color: "#2563eb",
                                            fontSize: "14px",
                                            fontWeight: 500,
                                            cursor: "pointer",
                                        }}
                                    >
                                        <PlusIcon size={16} /> Add stall
                                    </button>
                                </div>
                                {formData.requirements?.stallsPrices?.map((stall, index) => (
                                    <div key={index} className="form-row" style={{ position: "relative", display: "flex", gap: "24px", marginBottom: "20px", alignItems: "center", flexWrap: "wrap", paddingRight: "40px" }}>
                                        <div style={{ flex: 1, position: 'relative', minWidth: '150px' }}>
                                            <label
                                                style={{
                                                    display: 'block',
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    color: '#374151',
                                                    backgroundColor: 'white',
                                                    marginTop: '-10px',
                                                    marginLeft: '12px',
                                                    padding: '0 4px',
                                                    position: 'absolute',
                                                }}
                                            >
                                                Stall Type
                                            </label>
                                            <input
                                                value={stall.stallType}
                                                onChange={(e) => handleStallPriceChange(index, "stallType", e.target.value)}
                                                placeholder="e.g. Food, Merch"
                                                style={{
                                                    width: "100%",
                                                    padding: "12px 16px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #d1d5db",
                                                    fontSize: "14px",
                                                    outline: "none"
                                                }}
                                            />
                                            {formErrors[`requirements.stallsPrices.${index}.stallType`] && (
                                                <span style={{ color: "red", fontSize: "12px", position: "absolute", bottom: "-20px", left: "0" }}>{formErrors[`requirements.stallsPrices.${index}.stallType`]}</span>
                                            )}
                                        </div>
                                        <div style={{ flex: 1, position: 'relative', minWidth: '100px' }}>
                                            <label
                                                style={{
                                                    display: 'block',
                                                    fontSize: '12px',
                                                    fontWeight: 500,
                                                    color: '#374151',
                                                    backgroundColor: 'white',
                                                    marginTop: '-10px',
                                                    marginLeft: '12px',
                                                    padding: '0 4px',
                                                    position: 'absolute',
                                                }}
                                            >
                                                Stall Price
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={stall.stallPrice}
                                                onChange={(e) => handleStallPriceChange(index, "stallPrice", e.target.value)}
                                                placeholder="₹"
                                                style={{
                                                    width: "100%",
                                                    padding: "12px 16px",
                                                    borderRadius: "8px",
                                                    border: "1px solid #d1d5db",
                                                    fontSize: "14px",
                                                    outline: "none"
                                                }}
                                            />
                                            {formErrors[`requirements.stallsPrices.${index}.stallPrice`] && (
                                                <span style={{ color: "red", fontSize: "12px", position: "absolute", bottom: "-20px", left: "0" }}>{formErrors[`requirements.stallsPrices.${index}.stallPrice`]}</span>
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveStallPrice(index)}
                                            className="delete-btn"
                                            style={{
                                                position: "absolute",
                                                top: "0",
                                                right: "0",
                                                padding: "8px",
                                                color: "#ef4444",
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <TrashIcon className="trash-icon" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Post-Event Follow Up Section */}
            <div className="card" style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #7e7e7e',
                padding: '0px',
                boxShadow: 'none',
                maxWidth: '100%',
            }}>
                <div
                    onClick={() => toggleSection('postEvent')}
                    style={{
                        padding: '30px 32px',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                >
                    <h3 style={{ fontSize: '24px', fontWeight: 500, color: 'black' }}>
                        Post-Event Follow Up
                    </h3>
                    {openSections.postEvent ? (
                        <ChevronDownIcon style={{ width: '24px', height: '24px', transform: 'rotate(180deg)', transition: 'transform 0.3s' }} />
                    ) : (
                        <ChevronDownIcon style={{ width: '24px', height: '24px', transition: 'transform 0.3s' }} />
                    )}
                </div>

                {openSections.postEvent && (
                    <div className="card-content" style={{ padding: '0 32px 32px' }}>
                        <div style={{ marginTop: "16px", position: "relative" }}>
                            <label style={{
                                position: "absolute",
                                top: "-10px",
                                left: "12px",
                                backgroundColor: "white",
                                padding: "0 4px",
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#374151"
                            }}>
                                Feedback Request
                            </label>
                            <textarea
                                name="postEventFollowUp.thankYouNote"
                                value={formData.postEventFollowUp?.thankYouNote || ''}
                                onChange={handlePostEventChange}
                                style={{
                                    width: "100%",
                                    height: "120px",
                                    padding: "12px 16px",
                                    border: "1px solid #9ca3af",
                                    borderRadius: "4px",
                                    fontSize: "14px",
                                    outline: "none",
                                    resize: "vertical",
                                    color: "#1f2937"
                                }}
                                placeholder="Write a message to send to attendees after the event..."
                            />
                            {formErrors["postEventFollowUp.thankYouNote"] && (
                                <span style={{ color: "red", fontSize: "12px", position: "absolute", bottom: "-20px", left: "0" }}>{formErrors["postEventFollowUp.thankYouNote"]}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <style>{`
        /* Base / Desktop Defaults */
        .delete-btn {
            height: 40px;
            width: 40px;
        }
        .delete-btn .trash-icon {
            width: 20px;
            height: 20px;
        }

        @media (max-width: 768px) {
          .stalls-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .card-content {
            padding: 0 16px 16px !important;
          }
          input, textarea {
             font-size: 16px !important; /* Prevent zoom on mobile */
          }
          /* Responsive Delete Button for Mobile */
          .delete-btn {
            height: 50px;
            width: 50px;
          }
          .delete-btn .trash-icon {
            width: 28px;
            height: 28px;
          }
        }
      `}</style>
        </div>
    );
};

export default FinalForm;
