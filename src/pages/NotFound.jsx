

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404 - Not Found!</h1>
            <p className="mt-4">Sorry, the page you are looking for does not exist.</p>
            <p>Maybe try one of the links in the menu or go back to the home page.</p>
        </div>
    );
};

export default NotFound;
