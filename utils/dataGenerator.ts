/**
 * Data Generator Utility
 * Generates random but valid and realistic test data for registration scenarios
 */

import { type AccountData } from './types';

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
 * Generates a random title value accepted by the API
 */
export function generateRandomTitle(): string {
  const titles = ['Mr.', 'Mrs.'];
  return titles[Math.floor(Math.random() * titles.length)];
}

/**
 * Generates a random company name
 */
export function generateRandomCompany(): string {
  const prefixes = ['North', 'Blue', 'Prime', 'Summit', 'Evergreen', 'Nova'];
  const nouns = ['Labs', 'Systems', 'Holdings', 'Solutions', 'Works', 'Dynamics'];
  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]}`;
}

/**
 * Generates a random street address line 1
 */
export function generateRandomAddress1(): string {
  const streetNames = ['Main', 'Oak', 'Maple', 'Cedar', 'Pine', 'Sunset'];
  const streetTypes = ['St', 'Ave', 'Blvd', 'Rd', 'Ln', 'Dr'];
  const number = Math.floor(Math.random() * 8999) + 100;
  return `${number} ${streetNames[Math.floor(Math.random() * streetNames.length)]} ${streetTypes[Math.floor(Math.random() * streetTypes.length)]}`;
}

/**
 * Generates a random secondary address line
 */
export function generateRandomAddress2(): string {
  const unit = Math.floor(Math.random() * 80) + 1;
  return `Apt ${unit}`;
}

/**
 * Generates a random country value from the signup dropdown set
 */
export function generateRandomCountry(): string {
  const countries = ['United States', 'Canada', 'India', 'Australia', 'Israel', 'New Zealand'];
  return countries[Math.floor(Math.random() * countries.length)];
}

/**
 * Generates a random US-like state/city combination
 */
export function generateRandomStateCity(): { state: string; city: string } {
  const pairs = [
    { state: 'California', city: 'Los Angeles' },
    { state: 'Texas', city: 'Austin' },
    { state: 'New York', city: 'Buffalo' },
    { state: 'Florida', city: 'Miami' },
    { state: 'Washington', city: 'Seattle' },
  ];
  return pairs[Math.floor(Math.random() * pairs.length)];
}

/**
 * Generates complete random test user data
 */
export function generateRandomUserData(): AccountData {
  const firstName = generateRandomFirstName();
  const lastName = generateRandomLastName();
  const stateCity = generateRandomStateCity();
  const dateOfBirth = generateRandomDateOfBirth();

  return {
    name: `${firstName} ${lastName}`,
    email: generateRandomEmail(),
    password: generateRandomPassword(),
    title: generateRandomTitle(),
    birth_date: dateOfBirth.day,
    birth_month: dateOfBirth.month,
    birth_year: dateOfBirth.year,
    firstname: firstName,
    lastname: lastName,
    company: generateRandomCompany(),
    address1: generateRandomAddress1(),
    address2: generateRandomAddress2(),
    country: generateRandomCountry(),
    zipcode: generateRandomZipcode(),
    state: stateCity.state,
    city: stateCity.city,
    mobile_number: generateRandomMobileNumber(),
  };
}
