import React, { useState,useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { View, Text, TextInput, Button, Image, StyleSheet,  } from 'react-native';
import ToastManager, { Toast } from 'toastify-react-native'
import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  var hex_chr = "0123456789abcdef";


  function str2blks_Hash(str) {

    nblk = ((str.length + 8) >> 6) + 1;

    blks = new Array(nblk * 16);

    for (i = 0; i < nblk * 16; i++) blks[i] = 0;

    for (i = 0; i < str.length; i++)

        blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);

    blks[i >> 2] |= 0x80 << ((i % 4) * 8);

    blks[nblk * 16 - 2] = str.length * 8;

    return blks;

}
function add(x, y) {

    var lsw = (x & 0xFFFF) + (y & 0xFFFF);

    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);

    return (msw << 16) | (lsw & 0xFFFF);

}
function rol(num, cnt) {

    return (num << cnt) | (num >>> (32 - cnt));

}
function cmn(q, a, b, x, s, t) {

    return add(rol(add(add(a, q), add(x, t)), s), b);

}
function ff(a, b, c, d, x, s, t) {

    return cmn((b & c) | ((~b) & d), a, b, x, s, t);

}
function gg(a, b, c, d, x, s, t) {

    return cmn((b & d) | (c & (~d)), a, b, x, s, t);

}
function hh(a, b, c, d, x, s, t) {

    return cmn(b ^ c ^ d, a, b, x, s, t);

}
function ii(a, b, c, d, x, s, t) {

    return cmn(c ^ (b | (~d)), a, b, x, s, t);

}
  function rhex(num) {

    str = "";

    for (j = 0; j <= 3; j++)

        str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +

            hex_chr.charAt((num >> (j * 8)) & 0x0F);

    return str;

}
function str2blks_Hash(str) {

    nblk = ((str.length + 8) >> 6) + 1;

    blks = new Array(nblk * 16);

    for (i = 0; i < nblk * 16; i++) blks[i] = 0;

    for (i = 0; i < str.length; i++)

        blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);

    blks[i >> 2] |= 0x80 << ((i % 4) * 8);

    blks[nblk * 16 - 2] = str.length * 8;

    return blks;

}
  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;

}
  function HashPwd(str) {
    x = str2blks_Hash(str);
    a = 1732584193;
    b = -271733879;
    c = -1732584194;
    d = 271733878;
    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i + 10], 17, -42063);
        b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

        a = gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

        a = hh(a, b, c, d, x[i + 5], 4, -378558);
        d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = hh(b, c, d, a, x[i + 2], 23, -995338651);

        a = ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = ii(b, c, d, a, x[i + 9], 21, -343485551);



        a = add(a, olda);
        b = add(b, oldb);
        c = add(c, oldc);
        d = add(d, oldd);
    }

    var pass = rhex(a) + rhex(b) + rhex(c) + rhex(d);
    pass = pass.toUpperCase();
    return pass;

}
  function HashPwdV2(str, makeId) {
    var a = makeId;
    if (a == null || a == "")
        a = makeid();
    var b = HashPwd(str);
    b = b.toUpperCase();
    b = b.substr(0, 27) + a;
    b = HashPwd(b);
    b = b.toUpperCase();
    b = b + a;
    return b;
}

  const {login} = useContext(AuthContext);


  const handleLogin = () => {
    console.log(`Username: ${username}, Password: ${password}`);
    const hashedPassword = HashPwdV2(password + username.toLocaleLowerCase(), "");
    const loginData =  {"ApiKey":"ValidateLoginFromPortal","OrgId":0,"ApiParams":{"LoginId":username,"Password":hashedPassword}};
    // console.log(loginData)
    axios.post("http://simsdev.e-connectsolutions.com/Gateway/api/Authenticate/ValidateLogin", loginData).then((response) => {
      console.log(response.status, response.data);
      let status = response.data.Status;
      if (status==2) {
        login();
        Toast.success(response.data.Message);
      }
      else{
        Toast.error(response.data.Message);

      }
    });
    


  };
  const navigation = useNavigation();

  return (
        
      <View style={styles.container}>
  <ToastManager />

      <Image
        source={require('../assets/company.png')} // Replace with your company logo path
        style={styles.logo}
      />
      {/* <Text>{test}</Text> */}
      <Text style={styles.heading}>RAJ-SIMS</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
    heading:{
        fontSize: 40,
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default LoginScreen;
