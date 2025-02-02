const MovieModel = require('../models/movies.model');

class MovieController {
    // Get all movies and return JSON response
    static async fetchMovies(req, res) {
        try {
            const movies = await MovieModel.getAllMovies();
            console.log(movies);
            res.json(movies);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch movies' });
        }
    }

    // Get showtimes for a specific movie
    static async fetchShowtimes(req, res) {
        try {
            const { movieId } = req.params;
            const showtimes = await MovieModel.getShowtimesByMovieId(movieId);
            res.json(showtimes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to fetch showtimes' });
        }
    }

    static async fetchSeats(req, res) {
        const roomId = req.params.roomId;
        try {
            const seats = await MovieModel.getSeatsByRoomId(roomId);
            const groupedSeats = {}
            seats.forEach(seat => {
                // Create a group for this row if it doesn't exist
                if (!groupedSeats[seat.row]) {
                    groupedSeats[seat.row] = [];
                }
                // Add the seat to the corresponding row group
                groupedSeats[seat.row].push({
                    id: seat.id,
                    row: seat.row,
                    column: seat.column,
                    status: seat.status,
                });
            })
            console.log("groupedSeats", groupedSeats);
            res.json(groupedSeats);

        } catch (error) {
            console.error(error);
            res.status(500).send('Failed to fetch seats');
            return;
        }

            // // Group seats by rows for easier rendering in the frontend
            // const groupedSeats = seats.reduce((rows, seat) => {
            //     if (!rows[seat.row]) rows[seat.row] = [];
            //     rows[seat.row].push({
            //         id: seat.id,
            //         label: seat.label,
            //         isBooked: seat.isbooked,
            //     });
            //     return rows;
            // }, []);

            // res.json(groupedSeats);
    } 
}

module.exports = MovieController;