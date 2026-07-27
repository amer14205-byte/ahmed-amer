export type Language = 'ar' | 'en';

export interface StoryMilestone {
  id: string;
  year: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  descriptionEn: string;
  descriptionAr: string;
  iconName: string;
}

export interface RegistryItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  targetAmount?: number;
  currentAmount?: number;
  paymentDetailsEn?: string;
  paymentDetailsAr?: string;
  accountNumber?: string;
  imageUrl?: string;
}

export interface FAQItem {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export interface WeddingConfig {
  groomNameEn: string;
  groomNameAr: string;
  brideNameEn: string;
  brideNameAr: string;
  monogram: string;
  weddingDate: string; // ISO string e.g. "2026-10-15T18:00:00"
  timeZone: string;
  venueNameEn: string;
  venueNameAr: string;
  venueAddressEn: string;
  venueAddressAr: string;
  googleMapsUrl: string;
  heroQuoteEn: string;
  heroQuoteAr: string;
  dressCodeTitleEn: string;
  dressCodeTitleAr: string;
  dressCodeDescEn: string;
  dressCodeDescAr: string;
  dressCodeColors: { hex: string; nameEn: string; nameAr: string }[];
  contactPhone: string;
  storyMilestones: StoryMilestone[];
  scheduleEvents: ScheduleEvent[];
  registryItems: RegistryItem[];
  faqs: FAQItem[];
  themePalette: 'gold' | 'rose' | 'emerald' | 'royal' | 'terracotta';
}

export interface RsvpRecord {
  id: string;
  guestName: string;
  phone: string;
  attendance: 'attending' | 'declined';
  plusOnes: number;
  mealPreference?: string;
  songRequest: string;
  specialNote: string;
  submittedAt: string;
}

export interface GuestWish {
  id: string;
  authorName: string;
  relationship: string;
  message: string;
  submittedAt: string;
  likesCount: number;
}
