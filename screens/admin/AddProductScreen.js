import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import CustomLoader from "../../components/CustomLoader";
import { colors, network } from "../../constants";

// 📌 Import thay thế
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker";

const AddProductScreen = ({ navigation, route }) => {
  const { authUser } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [sku, setSku] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [alertType, setAlertType] = useState("error");
  const [categories, setCategories] = useState([]);

  const getToken = (obj) => {
    try {
      return JSON.parse(obj).token;
    } catch {
      return obj.token;
    }
  };

  // ───────────────────────────────────────────────
  // 📌 Lấy danh sách categories từ API
  // ───────────────────────────────────────────────
  const fetchCategories = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", getToken(authUser));

    setIsloading(true);

    fetch(`${network.serverip}/categories`, {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setCategories(result.categories);
        } else {
          setError(result.message);
        }
        setIsloading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsloading(false);
      });
  };

  // ───────────────────────────────────────────────
  // 📌 Upload image API
  // ───────────────────────────────────────────────
  const uploadImage = async (img) => {
    let formdata = new FormData();
    formdata.append("photos", {
      uri: img.uri,
      name: "product.jpg",
      type: img.type,
    });

    fetch("https://api-easybuy.herokuapp.com/photos/upload", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Upload result:", result);
      })
      .catch((error) => console.log(error));
  };

  // ───────────────────────────────────────────────
  // 📌 Pick Image (THAY expo-image-picker)
  // ───────────────────────────────────────────────
  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        includeBase64: false,
        maxHeight: 600,
        maxWidth: 600,
        quality: 0.7,
      },
      (response) => {
        if (response.didCancel) return;

        const img = response.assets[0];
        setImage(img);
        uploadImage(img);
      }
    );
  };

  // ───────────────────────────────────────────────
  // 📌 Add Product
  // ───────────────────────────────────────────────
  const addProductHandle = () => {
    if (!title) return setError("Please enter product title");
    if (!price || price <= 0) return setError("Please enter valid price");
    if (!quantity || quantity <= 0)
      return setError("Quantity must be greater than 1");
    if (!image) return setError("Please upload product image");

    setIsloading(true);

    const payload = {
      title,
      sku,
      price,
      image: image?.uri,
      description,
      category,
      quantity,
    };

    fetch(`${network.serverip}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": authUser.token,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setAlertType("success");
          setError(result.message);
        } else {
          setAlertType("error");
          setError(result.message);
        }
        setIsloading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsloading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar />
      <CustomLoader visible={isloading} label={"Adding ..."} />

      <View style={styles.TopBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={30} color={colors.muted} />
        </TouchableOpacity>
      </View>

      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>Add Product</Text>
        <Text style={styles.screenNameParagraph}>Add product details</Text>
      </View>

      <CustomAlert message={error} type={alertType} />

      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={styles.formContainer}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.imageHolder}>
              {image ? (
                <Image source={{ uri: image.uri }} style={{ height: 200, width: 200 }} />
              ) : (
                <AntDesign name="pluscircle" size={50} color={colors.muted} />
              )}
            </TouchableOpacity>
          </View>

          <CustomInput value={sku} setValue={setSku} placeholder="SKU" radius={5} />
          <CustomInput value={title} setValue={setTitle} placeholder="Title" radius={5} />
          <CustomInput value={price} setValue={setPrice} placeholder="Price" keyboardType="number-pad" radius={5} />
          <CustomInput value={quantity} setValue={setQuantity} placeholder="Quantity" keyboardType="number-pad" radius={5} />
          <CustomInput value={description} setValue={setDescription} placeholder="Description" radius={5} />
        </View>
      </ScrollView>

      {/* 📌 Picker mới – thay dropdown picker */}
      <View style={{ backgroundColor: "#fff", width: "100%", borderRadius: 8, elevation: 3 }}>
        <Picker selectedValue={category} onValueChange={setCategory} style={{ height: 50 }}>
          <Picker.Item label="Select Category" value="" />
          {categories.map((c) => (
            <Picker.Item key={c._id} label={c.title} value={c._id} />
          ))}
        </Picker>
      </View>

      <View style={styles.buttomContainer}>
        <CustomButton text="Add Product" onPress={addProductHandle} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    flexDirection: "row",
  },
  formContainer: {
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
  screenNameContainer: {
    marginTop: 10,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  screenNameParagraph: {
    fontSize: 15,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  imageHolder: {
    height: 200,
    width: 200,
    backgroundColor: colors.light,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttomContainer: {
    marginTop: 10,
    width: "100%",
  },
});
