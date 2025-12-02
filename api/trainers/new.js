// POST: create trainer
/*
* Purpose:
* Receive a request from the frontend (likely a POST request with JSON data)
* Create a new Trainer object using data from that request
* Save the trainer in the database
* Send a JSON response back to the frontend indicating success or failure.
* This is essentially the backend endpoint
* */


module.exports = async (req, res) => {
    try {

        /*
        req = the request object (contains things like req.body, req.params, headers etc)
        res = the response object used to send a response back to the client
        */
        const body = req.body;

        /*
        Map frontend "CourseId" back to backend "Course"
        The frontend sends CourseId, but your database model expects Course.
        */
        const mappedCourses = (body.Courses || []).map( c => ({
            Course: c.CourseId,
            CourseName: c.CourseName,
            RateType: c.RateType,
            Rate: c.Rate
        }));

        // Creating a new Trainer instance
        const trainer = new req.app.models.Trainer({
            Contact: body.ContactId,
            Notes: body.Notes,
            Active: body.Active,
            Courses: mappedCourses
        })
        // req.app.models.Trainer refers to a Mongoose model (or similar ORM/ODM model) for the Trainer collection/table.
        // save() is asynchronous and writes the new trainer document to the database.
        // await makes sure the function waits until the save is complete before continuing.
        await trainer.save();
        res.json({sucess: true, trainer});
        // Sends the newly created trainer back to the frontend.
    } catch (err){
        res.status(500).json({success: false, error: err.message});
    }
}

/*
*
* So this file is essentially a controller in the MVC (Model-View-Controller) pattern:

Model: Trainer (database schema)

View: Frontend that displays trainers

Controller: This file, handling requests, mapping data, saving, responding
*
* */
