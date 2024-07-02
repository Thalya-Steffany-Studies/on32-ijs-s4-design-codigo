export function verifyRegex(regex: any, value: string, errorMessage: string) {
  if (!regex.test(value)) {
    throw new Error(errorMessage);
  }
}

export function checkDuplicateUser(value: string, key: string, errorMessage: string) {
  if (this.users.some((user) => user[key] === value)) {
    throw new Error(errorMessage);
  }
}


export function validateCpf(cpf: string) {
  const cpfWithoutDots = cpf.replace(/[^\d]+/g, '')
  const CPF_WITHOUT_DOTS_LIST = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999']

  verifyRegex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, cpf, 'Invalid CPF')
  checkDuplicateUser(cpf, 'cpf', 'CPF already in use')

  if (cpfWithoutDots.length !== 11 || CPF_WITHOUT_DOTS_LIST.includes(cpfWithoutDots)) {
    throw new Error('Invalid CPF')
  }

  const validateCpfDigits = (cpf: string, length: number): boolean => {
    let sum = 0;
    for (let i = 1; i <= length; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (length + 1 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    return remainder === parseInt(cpf.substring(length, length + 1));
  };
  if (!validateCpfDigits(cpfWithoutDots, 9) || !validateCpfDigits(cpfWithoutDots, 10)) {
    throw new Error('Invalid CPF');
  }

}



// Calcula o primeiro dígito verificador
// for (let i = 1; i <= 9; i++) {
//   sum +=
//     parseInt(cpfWithoutDots.substring(i - 1, i)) * (11 - i);
// }

// remainder = (sum * 10) % 11;

// if (remainder === 10 || remainder === 11) {
//   remainder = 0;
// }

// if (remainder !== parseInt(cpfWithoutDots.substring(9, 10))) {
//   throw new Error('Invalid CPF');
// }

// sum = 0;

// // Calcula o segundo dígito verificador
// for (let i = 1; i <= 10; i++) {
//   sum +=
//     parseInt(cpfWithoutDots.substring(i - 1, i)) * (12 - i);
// }

// remainder = (sum * 10) % 11;

// if (remainder === 10 || remainder === 11) {
//   remainder = 0;
// }

// if (
//   remainder !== parseInt(cpfWithoutDots.substring(10, 11))
// ) {
//   throw new Error('Invalid CPF');
// }
// }
//     }
//   }

// }