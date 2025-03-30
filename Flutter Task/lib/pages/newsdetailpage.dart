import 'package:flutter/material.dart';

class NewsDetailsPage extends StatelessWidget {
  final String title;
  final String description;
  final String imageUrl;

  const NewsDetailsPage({
    super.key,
    required this.title,
    required this.description,
    required this.imageUrl,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF1F1F1), // 🌫️ Light Gray Background
      appBar: AppBar(
        backgroundColor: const Color(0xFF121212), // ✅ Dark Mode AppBar
        iconTheme: const IconThemeData(
          color: Colors.white, // Back arrow visible
        ),
        title: const Text(
          'News Details',
          style: TextStyle(
            color: Colors.white, // ✅ White Text on AppBar
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Display article image if available
            imageUrl.isNotEmpty
                ? ClipRRect(
                    borderRadius: BorderRadius.circular(8.0),
                    child: Image.network(
                      imageUrl,
                      width: double.infinity,
                      height: 200,
                      fit: BoxFit.cover,
                    ),
                  )
                : Container(
                    height: 200,
                    decoration: BoxDecoration(
                      color: Colors.grey[300],
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    child: const Center(
                      child: Icon(
                        Icons.image_not_supported,
                        size: 100,
                        color: Color(0xFF424242), // 📚 Medium Gray
                      ),
                    ),
                  ),
            const SizedBox(height: 16.0),

            // Title
            Text(
              title,
              style: const TextStyle(
                fontSize: 22.0,
                fontWeight: FontWeight.bold,
                color: Color(0xFF424242), // 📚 Medium Gray Text
              ),
            ),
            const SizedBox(height: 8.0),

            // Description
            Text(
              description.isNotEmpty
                  ? description
                  : 'No description available for this article.',
              style: const TextStyle(
                fontSize: 16.0,
                color: Color(0xFF424242), // 📚 Medium Gray Text
              ),
            ),
            const SizedBox(height: 16.0),
          ],
        ),
      ),
    );
  }
}
