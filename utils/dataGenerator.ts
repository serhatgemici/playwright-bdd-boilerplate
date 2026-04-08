/**
 * Data Generator Utility
 * Generates random but valid and realistic test data for registration scenarios
 */

interface TestUserData {
  signupName: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  password: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  zipcode: string;
  mobileNumber: string;
}

/**
 * Generates a random email address
 */
export function generateRandomEmail(): string {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 10000);
  return `testuser_${timestamp}_${randomNum}@example.com`;
}

/**
 * Generates a random first name
 */
export function generateRandomFirstName(): string {
  const firstNames = [
    'John',
    'Jane',
    'Michael',
    'Sarah',
    'David',
    'Emily',
    'James',
    'Jessica',
    'Robert',
    'Jennifer',
    'William',
    'Amanda',
    'Richard',
    'Rachel',
    'Joseph',
    'Lauren',
    'Thomas',
    'Michelle',
    'Charles',
    'Angela',
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

/**
 * Generates a random last name
 */
export function generateRandomLastName(): string {
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
}

/**
 * Generates a random valid password (min 8 chars, includes uppercase, lowercase, number)
 */
export function generateRandomPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
  let password = '';

  // Ensure at least one uppercase, one lowercase, and one number
  password += chars.charAt(Math.floor(Math.random() * 26)); // uppercase
  password += chars.charAt(26 + Math.floor(Math.random() * 26)); // lowercase
  password += chars.charAt(52 + Math.floor(Math.random() * 10)); // number

  // Fill rest randomly
  for (let i = password.length; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Shuffle the password
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

/**
 * Generates a random date of birth (age typically between 18-65 for test users)
 */
export function generateRandomDateOfBirth(): { day: string; month: string; year: string } {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 65; // 65 years old
  const maxYear = currentYear - 18; // 18 years old

  const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const monthName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][parseInt(month) - 1];
  const daysInMonth = new Date(year, parseInt(month), 0).getDate();
  const day = String(Math.floor(Math.random() * daysInMonth) + 1).padStart(2, '0');

  return {
    day: day.replace(/^0/, ''),
    month: monthName,
    year: year.toString(),
  };
}

/**
 * Generates a random US zipcode (5 digits)
 */
export function generateRandomZipcode(): string {
  return Math.floor(Math.random() * 90000 + 10000).toString();
}

/**
 * Generates a random mobile number in E.164 format (international)
 */
export function generateRandomMobileNumber(): string {
  const areaCode = Math.floor(Math.random() * 900) + 100;
  const exchangeCode = Math.floor(Math.random() * 900) + 100;
  const serialNumber = Math.floor(Math.random() * 9000) + 1000;
  return `+1${areaCode}${exchangeCode}${serialNumber}`;
}

/**
 * Generates complete random test user data
 */
export function generateRandomUserData(): TestUserData {
  const firstName = generateRandomFirstName();
  const lastName = generateRandomLastName();

  return {
    signupName: firstName,
    email: generateRandomEmail(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    password: generateRandomPassword(),
    dateOfBirth: generateRandomDateOfBirth(),
    zipcode: generateRandomZipcode(),
    mobileNumber: generateRandomMobileNumber(),
  };
}

/**
 * Storage for generated data within a test context
 */
let currentUserData: TestUserData | null = null;

/**
 * Set the current user data for the test session
 */
export function setCurrentUserData(data: TestUserData): void {
  currentUserData = data;
}

/**
 * Get the current user data for the test session
 */
export function getCurrentUserData(): TestUserData {
  if (!currentUserData) {
    currentUserData = generateRandomUserData();
  }
  return currentUserData;
}

/**
 * Clear the current user data
 */
export function clearCurrentUserData(): void {
  currentUserData = null;
}

/**
 * Initialize new user data for a test
 */
export function initializeNewUserData(): TestUserData {
  const userData = generateRandomUserData();
  setCurrentUserData(userData);
  return userData;
}
