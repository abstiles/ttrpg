.PHONY: depends serve

depends:
	bundle install --path vendor/bundle

serve:
	bundle exec jekyll serve
