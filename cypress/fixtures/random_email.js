const randomEmail = (type) => {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10).replaceAll("-", "");
    const pseudorandomString = (Math.random() + 1).toString(36).substring(2, 8);

    let emailAddress = `${todayString}.${pseudorandomString}@test.com`;

    if (type === "noAtSign") {
        emailAddress = `${todayString}.${pseudorandomString}.at.test.com`;
        return emailAddress;
    }

    if (type === "invalidDomain") {
        emailAddress = `${todayString}.${pseudorandomString}@test`;
        return emailAddress;
    }

    emailAddress = `${todayString}.${pseudorandomString}@test.com`;
    return emailAddress;
};

export default randomEmail;
