const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <p className="text-red-400 text-xs mt-1">
      {message}
    </p>
  );
};

export default ErrorMessage;