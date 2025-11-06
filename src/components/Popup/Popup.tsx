"use client";

import { useEffect, useState } from "react";
import { Button, Column, Heading, Text } from "@once-ui-system/core";
import styles from "./Popup.module.scss";

interface PopupProps {
  display: boolean;
  title: string;
  description: string;
}

export const Popup: React.FC<PopupProps> = ({ display, title, description }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if popup was dismissed in this session
    const popupDismissed = sessionStorage.getItem("popup-dismissed");
    
    if (display && !popupDismissed) {
      // Small delay for better UX
      setTimeout(() => setIsVisible(true), 500);
    }
  }, [display]);

  const handleClose = () => {
    setIsVisible(false);
    // Store dismissal in sessionStorage (cleared when browser closes)
    sessionStorage.setItem("popup-dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={styles.backdrop} 
        onClick={handleClose}
        onKeyDown={(e) => e.key === 'Escape' && handleClose()}
        role="button"
        tabIndex={0}
        aria-label="Close popup"
      />
      
      {/* Popup */}
      <div className={styles.popup}>
        <Column
          background="page"
          border="neutral-medium"
          radius="l"
          padding="24"
          gap="16"
          shadow="l"
          style={{ maxWidth: "400px" }}
        >
          <Heading variant="heading-strong-l">{title}</Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            {description}
          </Text>
          <Button
            onClick={handleClose}
            label="Got it"
            variant="primary"
            size="m"
          />
        </Column>
      </div>
    </>
  );
};
