export type Hours = number | string;
export type Minutes = number | string;

enum RoundingDirection {
  up,
  down,
  both,
}

// TODO: Pipeline - Implement custom formatting and rounding direction
export interface RoundingOptions {
  format?: string;
  roundingDirection?: RoundingDirection;
}
