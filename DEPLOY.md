# Como publicar gratuitamente

## GitHub Pages

1. Crie um repositório e envie o conteúdo da pasta `dist` para a branch `main`.
2. Em **Settings → Pages**, selecione **Deploy from a branch**.
3. Escolha `main` e a pasta `/root`.
4. Salve e aguarde a URL do GitHub Pages.

## Netlify

1. Acesse o Netlify e clique em **Add new site → Deploy manually**.
2. Arraste a pasta `dist` para a área de upload.
3. Para atualizações automáticas, conecte o repositório e configure `dist` como diretório de publicação.

## Vercel

1. Importe o repositório na Vercel.
2. Selecione **Other** como framework.
3. Deixe o comando de build vazio.
4. Defina `dist` como **Output Directory** e publique.

## Domínio próprio

1. Compre um domínio em um registrador de sua preferência.
2. Abra a área **Domains** da plataforma escolhida.
3. Adicione o domínio e copie os registros DNS fornecidos.
4. Cole os registros no painel do registrador e aguarde a propagação.
5. Atualize `canonical`, `og:url`, `robots.txt` e `sitemap.xml` com o domínio definitivo.

O certificado HTTPS é emitido automaticamente por GitHub Pages, Netlify e Vercel após a configuração do domínio.
