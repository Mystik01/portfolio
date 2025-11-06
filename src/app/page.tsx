// VERSION 4: Large Icon Cards (Portfolio Style)
// Bigger cards with prominent icons, more visual impact
"use client";

import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  SmartLink,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  RevealFx,
} from "@once-ui-system/core";
import { baseURL, about, person, social, sections, popup } from "@/resources";
import type { SectionConfig } from "@/types";
import styles from "@/components/about/about.module.scss";
import { Popup } from "@/components";
import React from "react";

export default function About() {
  const structure: SectionConfig[] = sections;
  type Img = { src: string; alt?: string; width: number; height: number };
  const projectImages: Img[] = [
    ...about.work.experiences.reduce((acc: Img[], exp) => acc.concat(exp.images || []), [] as Img[]),
    ...about.technical.skills.reduce((acc: Img[], skill) => acc.concat(skill.images || []), [] as Img[]),
  ];
  
  return (
      <Column id="top" maxWidth="m">
      <Popup 
        display={popup.display} 
        title={popup.title} 
        description={popup.description} 
      />
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path="/v4"
        image={`${baseURL}${person.avatar}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Row fillWidth s={{ direction: "column"}} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id="hero"
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social.map(
                  (item) =>
                    item.link && (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            key={item.name}
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            key={`${item.name}-icon`}
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ),
                )}
              </Row>
            )}
          </Column>

          {/* Always show intro section */}
          {about.intro.display && (
            <Column id="intro" textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {/* Render other sections from config */}
          {structure
            .filter((s) => s.display && s.type !== "intro")
            .map((s) => {
              switch (s.type) {
                case "technical":
                  return (
                    about.technical.display && (
                      <Column key={s.id} id={s.id} fillWidth marginBottom="40">
                        <RevealFx translateY={4} paddingBottom="2">
                          <Heading as="h2" variant="display-strong-s" marginBottom="xs">
                            {s.title}
                          </Heading>
                        </RevealFx>
                        {/* VERSION 4: Large Icon Cards - 4 per row with hover animation */}
                        <div style={{ width: "100%", marginTop: "4px" }}>
                          <div style={{ 
                            display: "flex", 
                            flexDirection: "row",
                            flexWrap: "wrap", 
                            gap: "12px",
                            width: "100%"
                          }}>
                            {about.technical.skills.flatMap((skill, skillIndex) => 
                              skill.tags?.map((tag, tagIndex) => (
                                <div 
                                  key={`${tag.name}-${skillIndex}-${tagIndex}`}
                                  style={{ 
                                    flex: "0 0 calc(25% - 9px)",
                                    height: "110px",
                                    display: "flex",
                                    minWidth: "calc(25% - 9px)",
                                    maxWidth: "calc(25% - 9px)",
                                  }}
                                  className="skill-tile-responsive"
                                >
                                  <RevealFx translateY={6} delay={0.06} style={{ width: "100%", height: "100%" }}>
                                    <Column
                                      background="neutral-alpha-weak"
                                      border="neutral-alpha-medium"
                                      radius="l"
                                      padding="12"
                                      gap="8"
                                      horizontal="center"
                                      vertical="center"
                                      fillWidth
                                      fillHeight
                                      style={{ 
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-8px)";
                                        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "none";
                                      }}
                                    >
                                    <Column
                                      background="brand-alpha-weak"
                                      border="brand-alpha-medium"
                                      radius="m"
                                      padding="8"
                                      style={{ transition: "all 0.3s ease" }}
                                    >
                                      <Icon 
                                        name={tag.icon || "checkmark"} 
                                        size="m" 
                                        onBackground="brand-medium" 
                                      />
                                    </Column>
                                    <Text variant="body-default-xs" align="center">
                                      {tag.name}
                                    </Text>
                                  </Column>
                                </RevealFx>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </Column>
                    )
                  );
                case "studies":
                  return (
                    about.studies.display && (
                      <Column key={s.id} id={s.id} fillWidth marginBottom="40">
                        <RevealFx translateY={4} paddingBottom="2">
                          <Heading as="h2" variant="display-strong-s" marginBottom="xs">
                            {s.title}
                          </Heading>
                        </RevealFx>
                        <Column fillWidth gap="s">
                          {about.studies.institutions.map((institution) => (
                            <Column key={institution.name} fillWidth gap="4">
                              <Text id={institution.name} variant="heading-strong-l">
                                {institution.name}
                              </Text>
                              {institution.timeframe && (
                                <Text variant="body-default-s" onBackground="neutral-weak">
                                  {institution.timeframe}
                                </Text>
                              )}
                              <Text variant="heading-default-xs" onBackground="neutral-weak">
                                {institution.description}
                              </Text>
                            </Column>
                          ))}
                        </Column>
                      </Column>
                    )
                  );
                case "work":
                  return (
                    about.work.display && (
                      <Column key={s.id} id={s.id} fillWidth marginBottom="40">
                        <Column fillWidth marginBottom="xs">
                          <RevealFx translateY={4} paddingBottom="2">
                            <Heading as="h2" variant="display-strong-s" marginBottom="xs">
                              {s.title}
                            </Heading>
                          </RevealFx>
                          {about.work.description && (
                            <Text variant="body-default-m" onBackground="neutral-weak">
                              {about.work.description}
                            </Text>
                          )}
                        </Column>
                        <Column fillWidth gap="l">
                          {about.work.experiences.map((experience) => (
                            <Column key={experience.company} fillWidth gap="4">
                              <Row gap="8" wrap>
                                <Text variant="heading-strong-l">
                                  {experience.role}
                                </Text>
                                <Text variant="heading-default-l" onBackground="neutral-weak">
                                  @ {experience.company}
                                </Text>
                              </Row>
                              {experience.timeframe && (
                                <Text variant="body-default-s" onBackground="neutral-weak">
                                  {experience.timeframe}
                                </Text>
                              )}
                              <Text variant="body-default-m" onBackground="neutral-weak">
                                {experience.description}
                              </Text>
                            </Column>
                          ))}
                        </Column>
                      </Column>
                    )
                  );
                case "projects":
                  return (
                    <Column key={s.id} id={s.id} fillWidth marginBottom="40">
                      <RevealFx translateY={4} paddingBottom="2">
                        <Heading as="h2" variant="display-strong-s" marginBottom="xs">
                          {s.title}
                        </Heading>
                      </RevealFx>
                      <Column fillWidth style={{ marginTop: "4px" }}>
                        {s.links && s.links.length > 0 ? (
                          <Row fillWidth gap="12" wrap>
                            {s.links.map((link) => (
                              <SmartLink
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ flex: "1 1 280px", minWidth: 260, maxWidth: 420 }}
                              >
                                <RevealFx translateY={6}>
                                  <Column
                                    background="neutral-alpha-weak"
                                    border="neutral-alpha-medium"
                                    radius="l"
                                    padding="16"
                                    gap="8"
                                    fillWidth
                                    style={{ transition: "box-shadow .2s ease" }}
                                    onMouseEnter={(e) => {
                                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 18px rgba(0,0,0,.12)";
                                    }}
                                    onMouseLeave={(e) => {
                                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                    }}
                                  >
                                    <Row gap="8" vertical="center">
                                      <Icon name="github" />
                                      <Heading as="h3" variant="heading-strong-m">
                                        {link.title}
                                      </Heading>
                                    </Row>
                                    {link.description && (
                                      <Text variant="body-default-s" onBackground="neutral-weak">
                                        {link.description}
                                      </Text>
                                    )}
                                    <Row gap="4" vertical="center">
                                      <Text variant="body-default-s">View on GitHub</Text>
                                      <Icon name="arrowUpRightFromSquare" size="s" />
                                    </Row>
                                  </Column>
                                </RevealFx>
                              </SmartLink>
                            ))}
                          </Row>
                        ) : (
                          <Text variant="body-default-m" onBackground="neutral-weak">No projects to show yet.</Text>
                        )}
                        <Row horizontal="center" paddingTop="m">
                          <Button
                            href={`https://github.com/${person.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            prefixIcon="github"
                            label="View All My Projects on GitHub"
                            size="l"
                          />
                        </Row>
                      </Column>
                    </Column>
                  );
                default:
                  return (
                    <Column key={s.id} id={s.id} fillWidth marginBottom="40">
                      <RevealFx translateY={8} paddingBottom="8">
                        <Heading as="h2" variant="display-strong-s" marginBottom="m">
                          {s.title}
                        </Heading>
                      </RevealFx>
                      <Column fillWidth gap="l">
                        {projectImages.length > 0 ? (
                          <Row fillWidth paddingTop="m" gap="12" wrap>
                            {projectImages.map((image) => (
                              <Row
                                key={image.src}
                                border="neutral-medium"
                                radius="m"
                                minWidth={image.width}
                                height={image.height}
                              >
                                <Media
                                  className="project-media"
                                  enlarge
                                  radius="m"
                                  sizes={image.width.toString()}
                                  alt={image.alt}
                                  src={image.src}
                                />
                              </Row>
                            ))}
                          </Row>
                        ) : (
                          <Text variant="body-default-m" onBackground="neutral-weak">No projects to show yet.</Text>
                        )}
                      </Column>
                    </Column>
                  );
              }
            })}
        </Column>
      </Row>
    </Column>
  );
}
