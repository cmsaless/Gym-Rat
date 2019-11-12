module.exports = {

    studentAuthenticated: (req, res, next) => {
        // If user is authenticated and NOT a professor
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            req.flash('errorMessage', 'You must be logged in as a student to view that page.');
            return res.redirect("error.html")
        }
    },

    isUser: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            req.flash('errorMessage', 'You must be logged in to view that page');
            return res.redirect('/login');
        }
    }
};