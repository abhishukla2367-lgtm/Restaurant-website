const Menu = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our Menu
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {["Dosa", "Idli", "Biryani", "Vada", "Curry", "Desserts"].map(
          (item) => (
            <div
              key={item}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item}</h3>
              <p className="text-gray-600">
                Delicious authentic preparation
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Menu;
