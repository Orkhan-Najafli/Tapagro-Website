export default {
  _default: (field) => `${field} göstəricisi yanlışdır.`,
  after: (field, [target, inclusion]) =>
    `${field} yalnız ${target} tarixindən sonra${
      inclusion ? `, və ya ${target} tarixində ` : " "
    }olmalıdır.`,
  alpha: (field) => `Это поле должно содержать только буквы`,
  alpha_dash: (field) =>
    `${field} должно содержать только буквы, цифры и дефисы.`,
  // alpha_num: (field) => `${field} yalnız rəqəmlərdən ibarət olmalıdır`,
  alpha_num: (field) => `${field} должно содержать только буквы и цифры`,

  alpha_spaces: (field) => `Это поле должно содержать только буквы и пробел.`,
  before: (field, [target, inclusion]) =>
    `${field} yalnız ${target} tarixindən öncə${
      inclusion ? `, və ya ${target} tarixində ` : " "
    }olmalıdır.`,
  between: (field, [min, max]) =>
    `${field} должно находиться только в диапазоне от ${min} до ${max}.`,

  confirmed: (field) => `${field} təsdiqləməsi yanlışdır.`,
  credit_card: (field) => `${field} göstəriciləri düzgün daxil olunmayıb.`,
  date_between: (field, [min, max]) =>
    `${field} ${min} və ${max} arası olmalıdır.`,
  date_format: (field, [format]) => `${field} ${format} formatında olmalıdır.`,
  decimal: (field, [decimals = "*"] = []) =>
    `Это поле должно содержать только цифры${
      !decimals || decimals === "*"
        ? ""
        : ` и nöqtədən после точки ${decimals} десятичных цифр`
    }.`,

  digits: (field, [length]) => `${field} ${length} rəqəmdən ibarət olmalıdır.`,

  dimensions: (field, [width, height]) =>
    `${field} ölçüsü ${width}x${height} piksel olmalıdır.`,
  email: (field) => `${field} необходимо ввести в правильном формате.`,
  excluded: (field) => `Вы не можете выбрать одно и то же`,
  ext: (field) => `${field} должно быть в правильном формате файла.`,
  image: (field) => `${field} должно быть изображением`,
  included: (field) => `${field} göstəricisi yanlışdır.`,
  integer: (field) => `${field} должно быть целым числом`,
  ip: (field) => `${field} IP ünvanı düzgün formatda daxil olunmayıb.`,
  length: (field, [length, max]) => {
    if (max) {
      return `Длина ${field} должна быть от ${length} до ${max}.`;
    }
    return `${field} ${length} должно содержать числа.`;
  },
  max: (field, [length]) =>
    `Длина этого поля должна содержать максимум  ${length} символов.`,
  max_value: (field, [max]) =>
    `В этом поле должно быть не более ${max} или меньше.`,
  mimes: (field) => `${field} formatı yanlışdır.`,
  min: (field, [length]) =>
    `Длина этого поля должна содержать не менее ${length} символов.`,
  min_value: (field, [min]) =>
    `Длина этого поля должна содержать не менее ${min} символов.`,
  numeric: (field) => `Это поле должно содержать только цифры.`,
  regex: (field) => `${field} formatı yanlışdır.`,
  required: (field = "Bu") => `Это поле является обязательным.`,

  size: (field, [size]) => `Размер ${field} должен быть ${size} или меньше.`,
  url: (field) => `${field} необходимо ввести в правильном формате URL.`,

  // custom messages
  sharpSymbol: (field) => `${field} введено неверно`,
};
