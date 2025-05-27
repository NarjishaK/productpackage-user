import React, { useState, useEffect } from "react";
import { useLocationContext } from "@/app/context/locationcontext";
import { useRouter } from "next/navigation";

const CustomSelect = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLocation, setSelectedLocation } = useLocationContext();
  const router = useRouter();

  // Find the selected option based on the current selectedLocation from context
  const selectedOption = options.find(option => option.value === selectedLocation) || options[0];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // Update the location in context
    setSelectedLocation(option.value);
    
    // Navigate to shop page when location is selected and not already there
    if (window.location.pathname !== '/shop-with-sidebar') {
      router.push('/shop-with-sidebar');
    }
    
    setIsOpen(false);
  };

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".dropdown-content")) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown-content custom-select relative" style={{ width: "200px" }}>
      <div
        className={`select-selected whitespace-nowrap ${
          isOpen ? "select-arrow-active" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption.label}
      </div>
      <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`select-item ${
              selectedOption.value === option.value ? "same-as-selected" : ""
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;