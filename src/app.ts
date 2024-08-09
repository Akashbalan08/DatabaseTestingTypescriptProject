import express from "express";
import { AuthorController } from "./controllers/author";
import { BookController } from "./controllers/book";
import { CustomerController } from "./controllers/customer";
import { OrderController } from "./controllers/order";
import { PublisherController } from "./controllers/publisher";
import { ReviewController } from "./controllers/review";

const app = express();
app.use(express.json());

const bookController = new BookController();
const authorController = new AuthorController();
const customerController = new CustomerController();
const reviewController = new ReviewController();
const orderController = new OrderController();
const publisherController = new PublisherController();

app.get("/books", bookController.getAllBooks.bind(bookController));
app.get("/books/:id", bookController.getBookById.bind(bookController));
app.post("/books", bookController.createBook.bind(bookController));
app.put("/books/:id", bookController.updateBook.bind(bookController));
app.delete("/books/:id", bookController.deleteBook.bind(bookController));
app.get(
  "/books/well-reviewed",
  bookController.getWellReviewedBooks.bind(bookController)
);
app.get(
  "/books/most-popular-genre",
  bookController.getMostPopularGenre.bind(bookController)
);

app.get("/authors", authorController.getAllAuthors.bind(authorController));
app.get("/authors/:id", authorController.getAuthorById.bind(authorController));
app.post("/authors", authorController.createAuthor.bind(authorController));
app.put("/authors/:id", authorController.updateAuthor.bind(authorController));
app.delete(
  "/authors/:id",
  authorController.deleteAuthor.bind(authorController)
);
app.get(
  "/authors/power-writers",
  authorController.getPowerWriters.bind(authorController)
);

app.get(
  "/customers",
  customerController.getAllCustomers.bind(customerController)
);
app.get(
  "/customers/:id",
  customerController.getCustomerById.bind(customerController)
);
app.post(
  "/customers",
  customerController.createCustomer.bind(customerController)
);
app.put(
  "/customers/:id",
  customerController.updateCustomer.bind(customerController)
);
app.delete(
  "/customers/:id",
  customerController.deleteCustomer.bind(customerController)
);
app.get(
  "/customers/loyal",
  customerController.getLoyalCustomers.bind(customerController)
);

app.get("/reviews", reviewController.getAllReviews.bind(reviewController));
app.get("/reviews/:id", reviewController.getReviewById.bind(reviewController));
app.post("/reviews", reviewController.createReview.bind(reviewController));
app.put("/reviews/:id", reviewController.updateReview.bind(reviewController));
app.delete(
  "/reviews/:id",
  reviewController.deleteReview.bind(reviewController)
);
app.get(
  "/reviews/recent",
  reviewController.getRecentReviews.bind(reviewController)
);

app.get("/orders", orderController.getAllOrders.bind(orderController));
app.get("/orders/:id", orderController.getOrderById.bind(orderController));
app.post("/orders", orderController.createOrder.bind(orderController));
app.put("/orders/:id", orderController.updateOrder.bind(orderController));
app.delete("/orders/:id", orderController.deleteOrder.bind(orderController));

app.get(
  "/publishers",
  publisherController.getAllPublishers.bind(publisherController)
);
app.get(
  "/publishers/:id",
  publisherController.getPublisherById.bind(publisherController)
);
app.post(
  "/publishers",
  publisherController.createPublisher.bind(publisherController)
);
app.put(
  "/publishers/:id",
  publisherController.updatePublisher.bind(publisherController)
);
app.delete(
  "/publishers/:id",
  publisherController.deletePublisher.bind(publisherController)
);

export default app;
