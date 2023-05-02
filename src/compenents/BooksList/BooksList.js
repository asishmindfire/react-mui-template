import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Card,
  CardContent,
  CardActions,
  Typography,
  TablePagination,
} from "@mui/material";
import { useEffect } from "react";
import { useUser } from "../../context/user-context";
import classes from "./styles.module.css";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [borrowedBook, setBorrowedBook] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // const [activeBookIsbn, setActiveBookIsbn] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const { isAdmin, user } = useUser();

  const fetchBooks = async () => {
    // const {books} = await getbooks();
    const books = [
      {
        _id: "sbdbnmbcrenre",
        name: "Davinci",
        category: "Philosophy",
        price: 99,
      },
      {
        _id: "mncbjvrtjrkjtnrt",
        name: "Gold medal",
        category: "Science",
        price: 89,
      },
    ];
    setBooks(books);
  };

  const fetchUserBook = async () => {
    // const { books } = await BackendApi.user.getBorrowBook()
    setBorrowedBook([{
      name: "marvel",
      Category: "fiction",
      availableQuantity: 8,
      price: 89.99,
    }]);
  };

  useEffect(() => {
    fetchBooks().catch(console.error);
    fetchUserBook().catch(console.error);
  }, []);

  const deleteBook = () => {
    // if (activeBookIsbn && books.length) {
    //     BackendApi.book.deleteBook(activeBookIsbn).then(({ success }) => {
    //         fetchBooks().catch(console.error)
    setOpenModal(false);
    // setActiveBookIsbn("");
    //     })
    // }
  };

  return (
    <>
      <div className={`${classes.pageHeader} ${classes.mb2}`}>
        {/* <div className="pageHeader mb2"> */}
        <Typography variant="h5">Book List</Typography>
      </div>

      {books.length > 0 ? (
        <>
          <div className={classes.tableContainer}>
            {/* <div className="tableContainer"> */}
            <TableContainer component={Paper}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? books.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : books
                  ).map((book) => (
                    <TableRow key={book._id}>
                      <TableCell component="th" scope="row">
                        {book.name}
                      </TableCell>
                      <TableCell>{book.category}</TableCell>
                      <TableCell align="right">{`$${book.price}`}</TableCell>
                      <TableCell>
                        <div className={classes.actionsContainer}>
                          {/* <div className="actionsContainer"> */}
                          <Button
                            variant="contained"
                            // className={classes.btn_exp}
                            component={RouterLink}
                            size="small"
                            to={`/books/${book.isbn}`}
                          >
                            View
                          </Button>
                          {isAdmin && (
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                component={RouterLink}
                                size="small"
                                to={`/admin/books/${book.isbn}/edit`}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={(e) => {
                                  // setActiveBookIsbn(book.isbn);
                                  setOpenModal(true);
                                }}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              component="div"
              count={books.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
            />
            <Modal open={openModal} onClose={(e) => setOpenModal(false)}>
              <Card className={classes.conf_modal}>
                {/* <Card className="conf_modal"> */}
                <CardContent>
                  <h2>Are you sure?</h2>
                </CardContent>
                <CardActions className={classes.conf_modal_actions}>
                  {/* <CardActions className="conf_modal_actions"> */}
                  <Button
                    variant="contained"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={deleteBook}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Modal>
          </div>
        </>
      ) : (
        <Typography variant="h5">No books found!</Typography>
      )}

      {user && !isAdmin && (
        <>
          <div className={`${classes.pageHeader} ${classes.mb2}`}>
            <Typography variant="h5">Borrowed Books</Typography>
          </div>
          {borrowedBook.length > 0 ? (
            <>
              <div className={classes.tableContainer}>
                <TableContainer component={Paper}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">ISBN</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {borrowedBook.map((book) => (
                        <TableRow key={book.isbn}>
                          <TableCell component="th" scope="row">
                            {book.name}
                          </TableCell>
                          <TableCell align="right">{book.isbn}</TableCell>
                          <TableCell>{book.category}</TableCell>
                          <TableCell align="right">{`$${book.price}`}</TableCell>
                          <TableCell>
                            <div className={classes.actionsContainer}>
                              <Button
                                variant="contained"
                                component={RouterLink}
                                size="small"
                                to={`/books/${book.isbn}`}
                              >
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          ) : (
            <Typography variant="h5">No books issued!</Typography>
          )}
        </>
      )}
    </>
  );
};

export default BooksList;
