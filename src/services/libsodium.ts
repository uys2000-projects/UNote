import _sodium from "libsodium-wrappers";
export const generetaKey = async function () {
  await _sodium.ready;
  const sodium = _sodium;
  return sodium.crypto_secretstream_xchacha20poly1305_keygen();
};

export const getStateOut = async function (key: Uint8Array) {
  await _sodium.ready;
  const sodium = _sodium;
  let res = sodium.crypto_secretstream_xchacha20poly1305_init_push(key);
  let [stateOut, header] = [res.state, res.header];
  return [stateOut, header] as [_sodium.StateAddress, Uint8Array];
};

export const getStateIn = async function (key: Uint8Array, header: Uint8Array) {
  await _sodium.ready;
  const sodium = _sodium;
  let stateIn = sodium.crypto_secretstream_xchacha20poly1305_init_pull(
    header,
    key
  );
  return stateIn;
};

export const encrypt = async function (
  text: string,
  stateOut: _sodium.StateAddress
) {
  await _sodium.ready;
  const sodium = _sodium;
  let cyrptedText = sodium.crypto_secretstream_xchacha20poly1305_push(
    stateOut,
    sodium.from_string(text),
    null,
    sodium.crypto_secretstream_xchacha20poly1305_TAG_MESSAGE
  );
  return cyrptedText;
};

export const decrypt = async function (
  cyrptedText: Uint8Array,
  stateIn: _sodium.StateAddress
) {
  await _sodium.ready;
  const sodium = _sodium;
  let r1 = sodium.crypto_secretstream_xchacha20poly1305_pull(
    stateIn,
    cyrptedText
  );
  let [text, tag] = [sodium.to_string(r1.message), r1.tag];
  return [text, tag] as [string, number];
};
