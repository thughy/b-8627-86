/**
 * Formats a CPF string with mask
 * @param cpf - CPF string to format (only digits)
 * @returns Formatted CPF string (e.g. 123.456.789-00)
 */
export const formatCPF = (cpf: string): string => {
  if (!cpf) return '';
  
  // Keep only numbers
  const digitsOnly = cpf.replace(/\D/g, '');
  
  // Apply mask to CPF
  return digitsOnly
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .substring(0, 14);
};

/**
 * Formats a CNPJ string with mask
 * @param cnpj - CNPJ string to format (only digits)
 * @returns Formatted CNPJ string (e.g. 12.345.678/0001-90)
 */
export const formatCNPJ = (cnpj: string): string => {
  if (!cnpj) return '';
  
  // Keep only numbers
  const digitsOnly = cnpj.replace(/\D/g, '');
  
  // Apply mask to CNPJ
  return digitsOnly
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
    .substring(0, 18);
};

/**
 * Formats a phone number string with mask
 * @param phone - Phone number string to format (only digits)
 * @returns Formatted phone number string (e.g. (11) 98765-4321)
 */
export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  
  // Keep only numbers
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Apply mask to phone number
  if (digitsOnly.length === 10) {
    // Fixed line phone
    return digitsOnly
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  
  // Mobile phone
  return digitsOnly
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .substring(0, 15);
};

/**
 * Validates a CPF number
 * @param cpf - CPF to validate (with or without mask)
 * @returns Boolean indicating if the CPF is valid
 */
export const validateCPF = (cpf: string): boolean => {
  // Remove non-numeric characters
  const cleanCpf = cpf.replace(/\D/g, '');
  
  if (cleanCpf.length !== 11) return false;
  
  // Check if all digits are the same (invalid case)
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
  
  // Calculate first digit
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digit1 = (remainder === 10 || remainder === 11) ? 0 : remainder;
  
  // Calculate second digit
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let digit2 = (remainder === 10 || remainder === 11) ? 0 : remainder;
  
  // Check if calculated digits match the provided ones
  return (
    parseInt(cleanCpf.charAt(9)) === digit1 &&
    parseInt(cleanCpf.charAt(10)) === digit2
  );
};

/**
 * Validates a CNPJ number
 * @param cnpj - CNPJ to validate (with or without mask)
 * @returns Boolean indicating if the CNPJ is valid
 */
export const validateCNPJ = (cnpj: string): boolean => {
  // Remove non-numeric characters
  const cleanCnpj = cnpj.replace(/\D/g, '');
  
  if (cleanCnpj.length !== 14) return false;
  
  // Check if all digits are the same (invalid case)
  if (/^(\d)\1{13}$/.test(cleanCnpj)) return false;
  
  // Calculate first digit
  let size = cleanCnpj.length - 2;
  let numbers = cleanCnpj.substring(0, size);
  const digits = cleanCnpj.substring(size);
  let sum = 0;
  let pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;
  
  // Calculate second digit
  size = size + 1;
  numbers = cleanCnpj.substring(0, size);
  sum = 0;
  pos = size - 7;
  
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  
  return result === parseInt(digits.charAt(1));
};
