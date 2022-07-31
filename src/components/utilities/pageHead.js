export default function pageHead(title, description) {
  document.title = title + ' | Bits & Bots';
  document
    .querySelector('meta[name="description"]')
    .setAttribute('content', description);
}
