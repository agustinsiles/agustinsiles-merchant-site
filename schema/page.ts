export enum SiteProperties {
  HEADING = "heading",
  DESCRIPTION = "description",
  PRIMARY_BUTTON_TEXT = "primaryButtonText",
  SECONDARY_BUTTON_TEXT = "secondaryButtonText",
  TRUNCATE_DESCRIPTION = "truncateDescription",
}

export default {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    [SiteProperties.HEADING]: {
      title: "Heading",
      type: "string",
      placeholder: "Here goes the title",
      requiredErrorMsg: "Heading is required",
    },
    [SiteProperties.DESCRIPTION]: {
      title: "Description",
      type: "string",
      placeholder: "Write a description here.",
      requiredErrorMsg: "Description is required",
    },
    [SiteProperties.PRIMARY_BUTTON_TEXT]: {
      title: "Primary Button Text",
      type: "string",
      requiredErrorMsg: "Primary button is required",
    },
    [SiteProperties.SECONDARY_BUTTON_TEXT]: {
      title: "Secondary Button Text",
      type: "string",
      requiredErrorMsg: "Secondary button is required",
    },
    [SiteProperties.TRUNCATE_DESCRIPTION]: {
      title: "Truncate Description",
      type: "boolean",
    },
  },
  required: [
    SiteProperties.HEADING,
    SiteProperties.DESCRIPTION,
    SiteProperties.PRIMARY_BUTTON_TEXT,
    SiteProperties.SECONDARY_BUTTON_TEXT,
  ],
};

export type SchemaType = {
  type: string;
  properties: {
    [key in SiteProperties]: {
      title: string;
      type: string;
      placeholder?: string;
      requiredErrorMsg?: string;
    };
  };
  required: SiteProperties[];
};

export type SiteType = {
  [key in SiteProperties]: string;
};
