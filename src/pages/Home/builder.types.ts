export type Builder = {
  participantId: number | null;
  identification: string | null;
  names: string;
  lastNames: string;
  phoneNumber: string;
  email: string;
  citieId: number | null;
  participantName?: string;
  participantLastNames?: string;
  city?: string;
};

export type Builders = Builder[];
