const LandingFooter = () => {
  return (
    <footer className="bg-gray-50">
      <div className="mx-auto sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <img
              src="/images/logo-transparent.png"
              alt="Company Logo"
              className="h-20"
            />
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright © 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
