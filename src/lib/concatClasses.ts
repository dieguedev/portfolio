type ClassValue = string | false | null | undefined;

export function concatClasses(classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
