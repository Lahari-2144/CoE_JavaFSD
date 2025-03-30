import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:gamesapp/pages/newsdetailpage.dart';

class LatestNewsPage extends StatefulWidget {
  const LatestNewsPage({super.key});

  @override
  State<LatestNewsPage> createState() => _LatestNewsPageState();
}

class _LatestNewsPageState extends State<LatestNewsPage> {
  String selectedCategory = 'general';
  List<dynamic> newsList = [];
  bool isLoading = true;
  bool hasError = false;

  final List<String> categories = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
  ];

  @override
  void initState() {
    super.initState();
    fetchNews(selectedCategory);
  }

  Future<void> fetchNews(String category) async {
    setState(() {
      isLoading = true;
      hasError = false;
    });

    final String apiKey = 'bcec970ac57b4301ac49f74716004ccb';
    final String url =
        'https://newsapi.org/v2/top-headlines?country=us&category=$category&apiKey=$apiKey';

    try {
      final response = await http.get(Uri.parse(url));

      if (response.statusCode == 200) {
        final data = json.decode(response.body);

        setState(() {
          newsList = data['articles'];
          isLoading = false;
        });
      } else {
        setState(() {
          hasError = true;
          isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        hasError = true;
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF1F1F1), // 🌫️ Light Gray Background
      appBar: AppBar(
        backgroundColor: const Color(0xFF121212), // ✅ Dark Mode
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back, // 🔙 Back Arrow
            color: Colors.white, // ✅ White Color for visibility
          ),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: const Text(
          'Latest News',
          style: TextStyle(
            color: Colors.white,
          ),
        ),
        centerTitle: true,
      ),
      body: Column(
        children: [
          // Category Dropdown
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
            color: const Color(0xFF121212), // ✅ Dark Mode for Dropdown Bar
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12.0),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8.0),
                border: Border.all(
                  color: const Color(0xFF4CAF50), // ✅ Green Border
                  width: 2.0,
                ),
              ),
              child: DropdownButtonHideUnderline(
                child: DropdownButton<String>(
                  dropdownColor: Colors.white,
                  value: selectedCategory,
                  isExpanded: true,
                  icon: const Icon(
                    Icons.arrow_drop_down,
                    color: Color(0xFF4CAF50), // ✅ Green Icon
                  ),
                  onChanged: (String? newValue) {
                    setState(() {
                      selectedCategory = newValue!;
                      fetchNews(selectedCategory);
                    });
                  },
                  style: const TextStyle(
                    color: Color(0xFF424242), // 📚 Medium Gray
                    fontSize: 16.0,
                    fontWeight: FontWeight.bold,
                  ),
                  items: categories.map<DropdownMenuItem<String>>(
                    (String value) {
                      return DropdownMenuItem<String>(
                        value: value,
                        child: Text(
                          value.toUpperCase(),
                          style: const TextStyle(color: Colors.black),
                        ),
                      );
                    },
                  ).toList(),
                ),
              ),
            ),
          ),

          // Show loading or error message
          if (isLoading)
            const Expanded(
              child: Center(
                child: CircularProgressIndicator(
                  color: Color(0xFF4CAF50), // ✅ Green Loading
                ),
              ),
            )
          else if (hasError)
            const Expanded(
              child: Center(
                child: Text(
                  'Failed to load news. Please try again later.',
                  style: TextStyle(fontSize: 16.0, color: Colors.red),
                  textAlign: TextAlign.center,
                ),
              ),
            )
          else if (newsList.isEmpty)
            const Expanded(
              child: Center(
                child: Text(
                  'No news found for this category.',
                  style: TextStyle(
                    fontSize: 16.0,
                    color: Color(0xFF424242), // 📚 Medium Gray
                  ),
                ),
              ),
            )
          else
            Expanded(
              child: ListView.builder(
                itemCount: newsList.length,
                itemBuilder: (context, index) {
                  final article = newsList[index];
                  final String imageUrl = article['urlToImage'] ?? '';
                  final String title = article['title'] ?? 'No Title';
                  final String description =
                      article['description'] ?? 'No Description';

                  return GestureDetector(
                    onTap: () {
                      // Navigate to News Details Page
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => NewsDetailsPage(
                            title: title,
                            description: description,
                            imageUrl: imageUrl,
                          ),
                        ),
                      );
                    },
                    child: Card(
                      color: Colors.white,
                      margin: const EdgeInsets.symmetric(
                          vertical: 8.0, horizontal: 12.0),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // News Image
                          imageUrl.isNotEmpty
                              ? ClipRRect(
                                  borderRadius: BorderRadius.circular(8.0),
                                  child: Image.network(
                                    imageUrl,
                                    width: 100,
                                    height: 100,
                                    fit: BoxFit.cover,
                                  ),
                                )
                              : Container(
                                  width: 100,
                                  height: 100,
                                  color: Colors.grey[300],
                                  child: const Icon(Icons.image_not_supported),
                                ),
                          const SizedBox(width: 10.0),

                          // News Details
                          Expanded(
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  // News Title
                                  Text(
                                    title,
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(
                                      fontSize: 16.0,
                                      fontWeight: FontWeight.bold,
                                      color: Color(0xFF424242), // 📚 Medium Gray
                                    ),
                                  ),
                                  const SizedBox(height: 4.0),

                                  // News Description
                                  Text(
                                    description,
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(
                                      fontSize: 14.0,
                                      color: Color(0xFF424242), // 📚 Medium Gray
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                          Icon(
                            Icons.arrow_forward_ios,
                            color: const Color(0xFFFF3D00), // 🔥 Vibrant Red Icon
                            size: 16.0,
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: const Color(0xFF4CAF50), // ✅ Green for action button
        onPressed: () {
          fetchNews(selectedCategory);
        },
        child: const Icon(
          Icons.refresh,
          color: Colors.white,
        ),
      ),
    );
  }
}
