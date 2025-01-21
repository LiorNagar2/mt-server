export const anonymize = (data: { [key: string]: any }) => {
    const anonymized = { ...data };
    if (anonymized?.email) {
        anonymized.email = anonymized.email.replace(/^.{3}/g, '***');
    }

    if (anonymized?.phoneNumber) {
        anonymized.phoneNumber = anonymized.phoneNumber.replace(
            /\d{4}$/,
            '****'
        );
    }

    if (anonymized?.password) {
        anonymized.password = '*****';
    }
    return anonymized;
};
