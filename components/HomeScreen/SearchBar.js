import { Image } from "expo-image";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
import scanIcon from "../../assets/icons/scan_icons.png";
import { colors } from "../../constants";

const SearchBar = ({ searchItems, handleProductPress }) => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const onChangeSearch = (text) => {
    setQuery(text);

    if (text.trim() === "") {
      setFilteredItems([]);
      setShowDropdown(false);
      return;
    }

    const results = searchItems.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredItems(results);
    setShowDropdown(true);
  };

  const handleSelect = (item) => {
    handleProductPress(item);
    setQuery(item.name);
    setShowDropdown(false);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputContainer}>
        <Searchbar
          placeholder="Search..."
          value={query}
          onChangeText={onChangeSearch}
          style={styles.searchInput}
          inputStyle={{ fontSize: 14 }}
        />

        {showDropdown && filteredItems.length > 0 && (
          <View style={styles.dropdown}>
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.id?.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.dropdownItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Scan</Text>
          <Image source={scanIcon} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  inputContainer: {
    width: "70%",
  },

  searchInput: {
    borderRadius: 10,
    height: 40,
    backgroundColor: colors.white,
    elevation: 3,
  },

  dropdown: {
    position: "absolute",
    top: 45,
    width: "100%",
    maxHeight: 200,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 5,
    zIndex: 20,
  },

  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.muted,
  },

  dropdownItemText: {
    color: colors.dark,
  },

  buttonContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },

  scanButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 40,
    width: "100%",
  },

  scanButtonText: {
    fontSize: 15,
    color: colors.light,
    fontWeight: "bold",
    marginRight: 5,
  },
});

export default SearchBar;
