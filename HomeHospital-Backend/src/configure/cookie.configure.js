// Configuration for the Access Token Cookie
export const accessOptions = {
	maxAge: 1000 * 60 * 60, // valid for 2 minutes,
	httpOnly: true,
}

// Configuration for the refresh Token Cookie
export const refreshOptions = {
	maxAge: 1000 * 60 * 60, // valid for 2 minutes,
	httpOnly: true,
}

// The Time for how often the web scrapper updates the DB
export const refreshTime = 300000 // 5 min
