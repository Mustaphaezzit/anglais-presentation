export default function SectionLabel({
  as: Tag = 'span',
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag className={`label inline-block ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}