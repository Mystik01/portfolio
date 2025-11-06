"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Fade,
  Flex,
  Line,
  Row,
  ToggleButton,
  IconButton,
} from "@once-ui-system/core";

import { routes, display, person, sections } from "@/resources";
import { ThemeToggle } from "../ThemeToggle";
import styles from "./Navbar.module.scss";

// Small, contained time display used on large screens
const TimeDisplay: React.FC<{ timeZone: string; locale?: string }> = ({
  timeZone,
  locale = "en-GB",
}) => {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat(locale, options).format(now));
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, [timeZone, locale]);
  return <>{currentTime}</>;
};

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const activeRef = useRef<string | null>("hero");

  // Observe in-page sections to highlight nav buttons (no URL hash changes)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const ids = ["hero", ...sections.filter((s) => s.display).map((s) => s.id)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Choose the element closest to viewport center for stability
        visible.sort((a, b) => {
          const aRect = a.target.getBoundingClientRect();
          const bRect = b.target.getBoundingClientRect();
          const center = window.innerHeight / 2;
          const aDist = Math.abs(aRect.top + aRect.height / 2 - center);
          const bDist = Math.abs(bRect.top + bRect.height / 2 - center);
          return aDist - bDist;
        });
        const id = visible[0].target.id;
        if (id !== activeRef.current) {
          activeRef.current = id;
          setActiveSection(id);
        }
      },
      { root: null, rootMargin: "-20% 0px -20% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

  for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToId = (id: string) => () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Fade hide s={{ hide: false }} fillWidth position="fixed" bottom="0" to="top" height="80" zIndex={9} />
      <Row
        fitHeight
        className={styles.position}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
        s={{ position: "fixed" }}
      >
        <Row paddingLeft="12" fillWidth vertical="center" textVariant="body-default-s">
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row background="page" border="neutral-alpha-weak" radius="m-4" shadow="l" padding="4" horizontal="center" zIndex={1}>
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="home"
                      selected={activeSection === "hero"}
                      onClick={scrollToTop}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <IconButton
                      icon="home"
                      aria-label="Top"
                      onClick={scrollToTop}
                    />
                  </Row>
                </>
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {sections.filter((s) => s.display).map((s, index) => (
                <React.Fragment key={s.id}>
                  {index > 0 && <div style={{ width: 4 }} />}
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon={s.icon}
                      label={s.label}
                      selected={activeSection === s.id}
                      onClick={scrollToId(s.id)}
                      className={styles.navLink}
                      aria-current={activeSection === s.id ? "true" : undefined}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon={s.icon}
                      selected={activeSection === s.id}
                      onClick={scrollToId(s.id)}
                      aria-label={s.label}
                      className={styles.navLink}
                    />
                  </Row>
                </React.Fragment>
              ))}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex fillWidth horizontal="end" vertical="center">
          <Flex paddingRight="12" horizontal="end" vertical="center" textVariant="body-default-s" gap="20">
            <Flex s={{ hide: true }}>{display.time && <TimeDisplay timeZone={person.location} />}</Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
